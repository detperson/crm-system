import { Layout } from "antd"

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

export function ProfilePage() {
    return (
        <Layout.Content style={contentStyle}>
            <h2>Профиль привет</h2>
        </Layout.Content>
    )
}