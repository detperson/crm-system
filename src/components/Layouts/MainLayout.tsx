import { Layout as LayoutAnt } from "antd";
import { MainMenuSider } from "../MainMenuSider";
import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <LayoutAnt>
            <MainMenuSider />
            <Outlet />
        </LayoutAnt>
    )
}