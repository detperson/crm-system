import { IMetaResponse } from "../types/IMetaResponse";
import { ITodo } from "../types/ITodo";
import { ITodoInfo } from "../types/ITodoInfo";
import { TodoSortType } from "../types/TodoSort";
import { TodoTask } from "./TodoTask";

interface AppMainProps {
    todos: IMetaResponse<ITodo, ITodoInfo>
    preload: () => Promise<void>
    filter: TodoSortType
}

export default function AppMain({ todos, preload, filter }: AppMainProps) {
    
    function filteredTodos(): ITodo[] {
        if (filter === 'all') {
            return [...todos.data]
        } else if (filter === 'in-work') {
            return todos.data.filter((todo) => !todo.isDone)
        } else if (filter === 'completed') {
            return todos.data.filter((todo) => todo.isDone)
        }
        //Написал этот return потому что без него была ошибка ts (хотя он не нужен)
        return todos.data

        //Не знаю как лучше?
        // return (
        //     todos.data.filter((todo) => {
        //         if (filter === 'all') {
        //             return {...todo}
        //         } else if (filter === 'in-work') {
        //             return !todo.isDone
        //         } else if (filter === 'completed') {
        //             return todo.isDone
        //         }
        //     })
        // )
    }

    return (
        <div>
            {todos.data ? (filteredTodos().map((todo) => (
                <TodoTask key={todo.id} todo={todo} preload={preload} />
            ))) : 
            'Загрузка...'
            }
        </div>
    )
}