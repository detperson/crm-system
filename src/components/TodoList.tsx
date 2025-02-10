import { EnumSortStatus, ITodo } from "../types/todos";
import { TodoTask } from "./TodoTask";

interface TodoListProps {
    todos: ITodo[]
    preload: (status?: EnumSortStatus) => Promise<void>
    filter: EnumSortStatus
}

export default function TodoList({ todos, preload, filter }: TodoListProps) {

    return (
        <div>
            {todos ? (todos.map((todo) => (
                <TodoTask key={todo.id} todo={todo} preload={preload} filter={filter} />
            ))) : 
            'Загрузка...'
            }
        </div>
    )
}