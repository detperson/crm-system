import { createSlice } from "@reduxjs/toolkit"
import { login, logout, profile, refresh } from "./thunks"
import { Profile } from "../../types/types"

interface InitiaState {
    accessToken?: string
    refreshToken?: string
    error?: string
    authenticated?: boolean
    profile?: Profile 
}

const initialState: InitiaState = {
    accessToken: localStorage.getItem('access') || undefined,
    refreshToken: localStorage.getItem('refresh') || undefined,
    authenticated: (localStorage.getItem('refresh') ? true : false),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(login.fulfilled.match, (_, action) => {
            localStorage.setItem('access', action.payload.accessToken)
            localStorage.setItem('refresh', action.payload.refreshToken)

            return {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                authenticated: true
            }
        })

        // если запрос неудачный (упал)
        builder.addMatcher(login.rejected.match, (_, action) => {
            return {
                error: action.error.message,
                authenticated: false
            }
        })

        //Профиль
        builder.addMatcher(profile.fulfilled.match, (state, action) => {
            state.profile = action.payload
        })

        builder.addMatcher(profile.rejected.match, (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        //Logout
        builder.addMatcher(logout.fulfilled.match, (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        builder.addMatcher(logout.rejected.match, (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.authenticated = false
        })

        //Refresh
        builder.addMatcher(refresh.fulfilled.match, (_, action) => {
            localStorage.setItem('access', action.payload.accessToken)
            localStorage.setItem('refresh', action.payload.refreshToken)

            return {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                authenticated: true
            }
        })

        builder.addMatcher(refresh.rejected.match, (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.authenticated = false
        })
    },
})