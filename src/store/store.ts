import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer, injectStore } from "./auth";

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([])
    }
})

injectStore(store) //Функция что бы получить доступ к стору в интерцепторе axios

export type RootState = ReturnType<typeof rootReducer>