import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

export function TodoSider() {
    const location = useLocation()
    const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: 'Список задач',
            path: '/',
        },
        {
            key: '2',
            label: 'Профиль',
            path: '/profile'
        },
    ]

    function handleMenuItemClick(key: string) {
        const clickedMenuItem = items.find((item) => item.key === key)
        
        if (clickedMenuItem) {
            navigate(clickedMenuItem.path)
        }
    }

    function selectedKeys() {
        const curentItem = items.find((item) => item.path === location.pathname)

        return [`${curentItem?.key}`]
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Menu
                style={{border: 'none'}}
                theme="light"
                mode="inline"
                defaultSelectedKeys={selectedKeys()}
                items={items}
                onClick={(item) => handleMenuItemClick(item.key)}
            />
        </Layout.Sider>
    )
}