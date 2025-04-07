import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData, Profile, Token } from "../../types/authTypes";
import { RootState } from "../store";
import axios from "axios";

const BASE_URL = 'https://easydev.club/api/v1'

const instanceThunksUrl = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

instanceThunksUrl.interceptors.response.use(function (response) {
        console.log("Успешно! Интерцептор", response);
        return response;
    }, function (error) {
        console.log("Ошибка! Интерцептор", error);
        return Promise.reject(error);
    });

export const login = createAsyncThunk(
    'auth/login',
    async (body: AuthData) => {
        // const response = await fetch(
        //     'https://easydev.club/api/v1/auth/signin', 
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(body)
        //     }
        // )

        // if (!response.ok) {
        //     throw new Error(response.status.toString())
        // }

        // const data: Token = await response.json()

        // return data
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

        // const data: Token = await fetch(
        //     'https://easydev.club/api/v1/auth/refresh', 
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             refreshToken: refreshToken
        //         })
        //     }
        // ).then(res => res.json())

        // return data
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

        // await fetch(
        //     'https://easydev.club/api/v1/user/logout', 
        //     {
        //         method: 'POST',
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     }
        // ).then(res => res.json())

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
        try {
            const state = thunkApi.getState() as RootState
            const accessToken = state.auth.accessToken

            // const response = await fetch(
            //     'https://easydev.club/api/v1/user/profile', 
            //     {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`
            //         }
            //     }
            // )

            const response = await instanceThunksUrl.get<Profile>('/user/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

             //если недействительный access (401 код), делаем refresh запрос
            // if (!response.ok && response.status === 401) {
            //     const refreshResult = await thunkApi.dispatch(refresh())

            //     if (refreshResult.meta.requestStatus === 'fulfilled') {
            //         const retryProfile: Profile = await thunkApi.dispatch(profile()).unwrap() //unwrap возвращает результат сразу
            //         return retryProfile
            //     } else {
            //         throw new Error('Не удалось обновить токены')
            //     }
            // }

            // const data: Profile = await response.json()
            
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                //если недействительный access (401 код), делаем refresh запрос
                if (err.status === 401) {
                    const refreshResult = await thunkApi.dispatch(refresh())

                    if (refreshResult.meta.requestStatus === 'fulfilled') {
                        const retryProfile: Profile = await thunkApi.dispatch(profile()).unwrap() //unwrap возвращает результат сразу
                        return retryProfile
                        // const state = thunkApi.getState() as RootState
                        // const accessToken = state.auth.accessToken

                        // const response = await instanceThunksUrl.get<Profile>('/user/profile', {
                        //     headers: {
                        //         Authorization: `Bearer ${accessToken}`
                        //     }
                        // })
                        // return response.data
                    } else {
                        console.error('Ошибка: Не удалось обновить токены')
                        throw err
                    }
                }
            } else {
                console.error(err)
                throw err
            }
            throw err
        }
        
    }
)