import { createSlice } from "@reduxjs/toolkit"
import { login, logout, profile, refresh } from "./thunks"
import { Profile } from "../../types/authTypes"
import { understandebleErrorMessage } from "../../utils/utils"
import { tokenService } from "../../api/TokenServiсe"

interface InitiaState {
    error?: string
    authenticated: boolean
    profile?: Profile,
    isRefreshLoading?: boolean
}

const initialState: InitiaState = {
    authenticated: false,
    isRefreshLoading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(login.fulfilled.match, (state, action) => {
            tokenService.setAccess(action.payload.accessToken)
            localStorage.setItem('refresh', action.payload.refreshToken)

            state.authenticated = true
        })

        // если запрос неудачный (упал)
        builder.addMatcher(login.rejected.match, (_, action) => {
            const errorMessage = understandebleErrorMessage(action.error.message || 'Ошибка при авторизации')
            return {
                error: errorMessage,
                authenticated: false
            }
        })

        //Профиль
        builder.addMatcher(profile.fulfilled.match, (state, action) => {
            state.profile = action.payload
        })

        builder.addMatcher(profile.rejected.match, (state) => {
            tokenService.clearToken()
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        //Logout
        builder.addMatcher(logout.fulfilled.match, (state) => {
            tokenService.clearToken()
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        builder.addMatcher(logout.rejected.match, (state) => {
            tokenService.clearToken()
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        //Refresh
        builder.addMatcher(refresh.fulfilled.match, (_, action) => {
            tokenService.setAccess(action.payload.accessToken)
            localStorage.setItem('refresh', action.payload.refreshToken)

            return {
                authenticated: true,
                isRefreshLoading: false
            }
        })

        builder.addMatcher(refresh.rejected.match, (state) => {
            tokenService.clearToken()
            localStorage.removeItem('refresh')
            state.authenticated = false
            state.isRefreshLoading = false
        })
    },
})