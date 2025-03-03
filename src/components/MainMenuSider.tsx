import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

export function MainMenuSider() {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState(['1'])

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

    function updateSelectedKeys() {
        const curentItem = items.find((item) => item.path === location.pathname)

        if (!curentItem) {
            return
        }

        setSelectedKeys([`${curentItem?.key}`])
    }

    useEffect(() => {
        updateSelectedKeys()
    }, [location.pathname])

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Menu
                style={{border: 'none'}}
                theme="light"
                mode="inline"
                selectedKeys={selectedKeys}
                items={items}
                onClick={(item) => handleMenuItemClick(item.key)}
            />
        </Layout.Sider>
    )
}