import { Layout as LayoutAnt } from "antd";
import { TodoSider } from "./TodoSider";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <LayoutAnt>
            <TodoSider />
            <Outlet />
        </LayoutAnt>
    )
}