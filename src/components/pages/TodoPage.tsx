import { useState, useEffect } from "react"
import TodoHeader from "../TodoHeader"
import TodoList from "../TodoList"
import TodoSorting from "../TodoSorting"
import { EnumSortStatus, ITodo, ITodoInfo } from "../../types/types"
import { fetchData } from "../../api/api"
import { Layout } from "antd"

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
}

export function TodoPage() {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [todosInfo, setTodoInfo] = useState<ITodoInfo>({all: 0, completed: 0, inWork: 0})
    const [filter, setFilter] = useState<EnumSortStatus>(EnumSortStatus.ALL)

    async function preload(status?: EnumSortStatus) {
        try {
            const resp = await fetchData(status)
            setTodos(resp.data)
            if (resp.info) {
                setTodoInfo(resp.info)
            }
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    useEffect(() => {
        preload()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            preload(filter)
        }, 5000) //Таймаут автообновления на 5 секунд
        
        return () => {
            clearInterval(timer)
        }
    }, [preload, filter])

    return (
        <Layout.Content style={contentStyle}>
            <div className="app__container">
                <h1 className="app__logo">Todo</h1>
                <TodoHeader preloadWithFilter={() => preload(filter)}/>
                <TodoSorting todosInfo={todosInfo} preload={preload} filter={filter} setFilter={setFilter}/>
                <TodoList todos={todos} preloadWithFilter={() => preload(filter)}/>
            </div>
        </Layout.Content>
    )
}