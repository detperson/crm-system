import { Layout } from "antd";
import { TodoPage } from "./TodoPage";
import { TodoSider } from "./TodoSider";

export function TodoLayout() {
    return (
        <Layout>
            <TodoSider />
            <TodoPage />
        </Layout>
    )
}