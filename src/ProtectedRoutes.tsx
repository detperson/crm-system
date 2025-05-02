import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "./store/hooks"

interface IProtectedRoutes {
    auth?: boolean
}

export const ProtectedRoutes = ({ auth = false }: IProtectedRoutes) => {
    const authenticated = useAppSelector(store => store.auth.authenticated)
    const isRefreshLoading = useAppSelector(store => store.auth.isRefreshLoading)

    if (authenticated === undefined) {
        return null
    }

    if (isRefreshLoading) {
        return null
    }
    
    return (
        authenticated === auth ? <Outlet /> : <Navigate to={auth ? '/auth/login' : '/'} />
    )
}