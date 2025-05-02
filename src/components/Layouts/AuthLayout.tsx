import { Flex, Image, Layout as LayoutAnt } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import authLogo from "../../assets/auth.svg"
import { useAppSelector } from "../../store/hooks";

export function AuthLayout() {
    const isAuthenticated = useAppSelector((store) => store.auth.authenticated)
    
    //Перенаправляем внутрь, если уже авторизарван
    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }
    
    return (
        <LayoutAnt style={{ background: '#fff' }}>
            <Flex gap="middle">
                <Image 
                    src={authLogo}
                    preview={false}
                    height='100vh'
                    style={{ objectFit: 'cover' }}
                />
                <LayoutAnt>
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{ height: '100vh', background: '#fff' }}
                    >
                        <Outlet />
                    </Flex>
                </LayoutAnt>
            </Flex>
        </LayoutAnt>
    )
}