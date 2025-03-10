import { Flex, Image, Layout as LayoutAnt } from "antd";
import { Outlet } from "react-router-dom";
import authLogo from "../../assets/auth.svg"

export function AuthLayout() {
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