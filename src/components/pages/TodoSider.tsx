import { Layout, Menu } from "antd";

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
}

export function TodoSider() {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Menu
                style={{border: 'none'}}
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                {
                    key: '1',
                    label: 'Список задач',
                },
                {
                    key: '2',
                    label: 'Профиль',
                },
                ]}
                onClick={(item) => console.log('Click', item.key)}
            />
        </Layout.Sider>
    )
}