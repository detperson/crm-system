import { Layout as LayoutAnt } from "antd";
import { MainMenuSider } from "./MainMenuSider";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <LayoutAnt>
            <MainMenuSider />
            <Outlet />
        </LayoutAnt>
    )
}