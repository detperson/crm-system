import { IMetaResponse } from "../types/IMetaResponse"
import { ITodo } from "../types/ITodo"
import { ITodoInfo } from "../types/ITodoInfo"
import { TodoSortType } from "../types/TodoSort"

interface AppSortingProps {
    todos: IMetaResponse<ITodo, ITodoInfo>
    filter: TodoSortType
    setFilter: React.Dispatch<React.SetStateAction<TodoSortType>>
}

export default function AppSorting({ todos, filter, setFilter }: AppSortingProps) {
    return (
        <div className="sorting__list">
            <div
                className={filter === 'all' ? 'activ-sort' : ''}
                onClick={() => setFilter('all')}
            >
                Все ({todos.info ? todos.info.all : 0})
            </div>
            <div
                className={filter === 'in-work' ? 'activ-sort' : ''}
                onClick={() => setFilter('in-work')}
            >
                в работе ({todos.info ? todos.info.inWork : 0})
            </div>
            <div
                className={filter === 'completed' ? 'activ-sort' : ''}
                onClick={() => setFilter('completed')}
            >
                сделано ({todos.info ? todos.info.completed : 0})
            </div>
        </div>
    )
}