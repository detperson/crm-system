import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData, Profile, Token } from "../../types/authTypes";
import { RootState, store as reduxStore } from "../store";
import axios from "axios";

const BASE_URL = 'https://easydev.club/api/v1'

export const instanceThunksUrl = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

type AppStore = typeof reduxStore
// Для доступа к стор в интерцепторе.
let store: AppStore
export const injectStore = (_store: typeof store) => {
    store = _store
}

instanceThunksUrl.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config

        if (axios.isAxiosError(error) && !originalRequest._retry && error.response?.status === 401 && 
            originalRequest.url.includes('/profile')
        ) {
            originalRequest._retry = true

            try {
                const refreshResponse = await store.dispatch(refresh())

                if (refreshResponse.meta.requestStatus === 'fulfilled') {
                    const state = store.getState() as RootState
                    const updatedAccessToken = state.auth.accessToken

                    originalRequest.headers['Authorization'] = `Bearer ${updatedAccessToken}`

                    const retryProfile = await instanceThunksUrl<Profile>(originalRequest)
                    return retryProfile
                } else {
                    console.error('Ошибка: Не удалось обновить токены')
                    return Promise.reject(error)
                }
            } catch (refreshError) { //Тут вроде не особо нужен catch
                console.error('Ошибка: Не удалось обновить токены')
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (body: AuthData) => {
        try {
            const response = await instanceThunksUrl.post<Token>('/auth/signin', body)

            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(err.status?.toString())
            } else {
                throw err
            }
        }
    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const refreshToken = state.auth.refreshToken

        if (!refreshToken) {
            throw new Error('Нет refresh токена')
        }

        const response = await instanceThunksUrl.post<Token>('/auth/refresh', {
            refreshToken: refreshToken
        })
        
        return response.data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const accessToken = state.auth.accessToken

        await instanceThunksUrl.post('/user/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
)

export const profile = createAsyncThunk(
    'auth/profile',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const accessToken = state.auth.accessToken
        
        const response = await instanceThunksUrl.get<Profile>('/user/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    }
)