import { Button, Layout } from "antd"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { logout, profile as profileAction } from "../../store/auth"

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

export function ProfilePage() {
    const dispath = useAppDispatch()
    const profile = useAppSelector(store => store.auth.profile)

    function onLogout() {
        dispath(logout())
    }

    useEffect(() => {
        dispath(profileAction())
    }, [])

    return (
        <Layout.Content style={contentStyle}>
            <h2>Профиль привет</h2>
            <div>{`Имя пользователя: ${profile?.username}`}</div>
            <div>{`Почтовый адрес: ${profile?.email}`}</div>
            <div>{`Телефон: ${profile?.phoneNumber}`}</div>
            <Button onClick={onLogout}>Выйти</Button>
        </Layout.Content>
    )
}