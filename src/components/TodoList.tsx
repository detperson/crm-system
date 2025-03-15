import { ITodo } from "../types/types";
import { TodoTask } from "./TodoTask";

interface TodoListProps {
    todos: ITodo[]
    preloadWithFilter: () => Promise<void>
}

export default function TodoList({ todos, preloadWithFilter }: TodoListProps) {

    return (
        <div>
            {todos ? (todos.map((todo) => (
                <TodoTask key={todo.id} todo={todo} preloadWithFilter={preloadWithFilter} />
            ))) : 
            'Загрузка...'
            }
        </div>
    )
}