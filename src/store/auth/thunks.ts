import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData } from "../../types/authTypes";
import { loginFetch, logoutFetch, profileFetch, refreshFetch } from "../../api/authApi";

export const login = createAsyncThunk(
    'auth/login',
    async (body: AuthData) => {
        return await loginFetch(body)
    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async () => {
        return await refreshFetch()
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await logoutFetch()
    }
)

export const profile = createAsyncThunk(
    'auth/profile',
    async () => {
        return await profileFetch()
    }
)