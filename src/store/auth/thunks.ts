import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData, Profile, Token } from "../../types/types";
import { RootState } from "../store";

export const login = createAsyncThunk(
    'auth/login',
    async (body: AuthData) => {
        const data: Token = await fetch(
            'https://easydev.club/api/v1/auth/signin', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then(res => res.json())

        return data
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

        const data: Token = await fetch(
            'https://easydev.club/api/v1/auth/refresh', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            }
        ).then(res => res.json())

        return data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const accessToken = state.auth.accessToken

        await fetch(
            'https://easydev.club/api/v1/user/logout', 
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json())
    }
)

export const profile = createAsyncThunk(
    'auth/profile',
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState
            const accessToken = state.auth.accessToken

            if (!accessToken) {
                throw new Error('Нет access токена')
            }

            const response = await fetch(
                'https://easydev.club/api/v1/user/profile', 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            //если недействительный access (401 код), делаем refresh запрос
            if (!response.ok && response.status === 401) {
                const refreshResult = await thunkApi.dispatch(refresh())

                if (refreshResult.meta.requestStatus === 'fulfilled') {
                    const retryProfile: Profile = await thunkApi.dispatch(profile()).unwrap() //unwrap возвращает результат сразу
                    return retryProfile
                } else {
                    throw new Error('Не удалось обновить токены')
                }
            }

            const data: Profile = await response.json()
            
            return data
        } catch (err) {
            console.error(err)
            throw err
        }
        
    }
)