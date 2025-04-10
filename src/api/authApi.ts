import axios from "axios"
import { AuthData, Profile, Token } from "../types/authTypes"
import { tokenService } from "./TokenServiсe"
import { BASE_URL } from "../utils/constants"

export const instanceAuthUrl = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

instanceAuthUrl.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${tokenService.getAccess()}`
    return config
})

instanceAuthUrl.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config

        if (axios.isAxiosError(error) && !originalRequest._retry && error.response?.status === 401 && 
            originalRequest.url.includes('/profile')
        ) {
            originalRequest._retry = true

            try {
                const refreshResponse = await refreshFetch()
                tokenService.setAccess(refreshResponse.accessToken)
                localStorage.setItem('refresh', refreshResponse.refreshToken)

                const retryProfile = await instanceAuthUrl<Profile>(originalRequest)
                return retryProfile
            } catch (refreshError) {
                console.error('Ошибка: Не удалось обновить токены')
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export async function loginFetch(body: AuthData) {
    try {
        const response = await instanceAuthUrl.post<Token>('/auth/signin', body)

        return response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.status?.toString())
        } else {
            throw err
        }
    }
}

export async function refreshFetch() {
    const refreshToken = localStorage.getItem('refresh')

    if (!refreshToken) {
        throw new Error('Нет refresh токена')
    }

    try {
        const response = await instanceAuthUrl.post<Token>('/auth/refresh', {
            refreshToken: refreshToken
        })
        
        return response.data
    } catch (err) {
        throw err
    }
}

export async function logoutFetch() {
    try {
        await instanceAuthUrl.post('/user/logout')
    } catch (err) {
        throw err
    }
}

export async function profileFetch() {
    try {
        const response = await instanceAuthUrl.get<Profile>('/user/profile')

        return response.data
    } catch (err) {
        throw err
    }
}