import { useState } from "react";
import { IMetaResponse } from "../types/IMetaResponse";
import { ITodo } from "../types/ITodo";
import { ITodoInfo } from "../types/ITodoInfo";
import { TodoSortType } from "../types/TodoSort";

interface AppMainProps {
    todos: IMetaResponse<ITodo, ITodoInfo>
    deleteTodo: (id: number) => Promise<void>
    changeTodo: (todo: ITodo, value?: string) => Promise<void>
    filter: TodoSortType
}

export default function AppMain({ todos, deleteTodo, changeTodo, filter }: AppMainProps) {
    const [editing, setEditing] = useState(0)
    const [newValue, setNewValue] = useState('')


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

    function handleSaveClick(todo: ITodo) {
        //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        if (todo.title === newValue) {
            setEditing(0)
            return
        }

        if (newValue.length >= 2 && newValue.length <= 64) {
            changeTodo(todo, newValue)
            
            setEditing(0)
        } else {
            alert('Значение должно быть от 2 до 64 символов')
        }
    }
    
    return (
        <div>
            {todos.data ? (filteredTodos().map((todo) => (
                <div className="main__task" key={todo.id}>
                    <div className="main__task_info">
                        <input 
                            className="main__task_checkbox"
                            type="checkbox" 
                            defaultChecked={todo.isDone}
                            onClick={() => changeTodo(todo)}
                        />
                        {(editing === todo.id) 
                        ?
                        <input 
                            className="main__task_edit_input"
                            defaultValue={todo.title} 
                            onChange={(e) => setNewValue(e.target.value.trim())} 
                        />
                        :
                        <div className={todo.isDone ? 'main__task_text task_text-complited' : 'main__task_text'}>
                            {todo.title}
                        </div>}
                    </div>
                    <div className="main__task_buttons">
                        {(editing === todo.id)
                        ?
                        <button
                            className="main__task_buttons-save"
                            onClick={() => handleSaveClick(todo)}
                        >
                            <img src="/save_icon.svg" alt="save"/>
                        </button>
                        :
                        <button
                            className="main__task_buttons-edit"
                            onClick={() => {
                                setNewValue(todo.title)
                                setEditing(todo.id)
                            }}
                        >
                            <img src="/edit_icon.svg" alt="edit"/>
                        </button>}

                        {(editing === todo.id)
                        ? 
                        <button 
                            className="main__task_buttons-cansel"
                            onClick={() => setEditing(0)}
                        >
                            <img src="/cancel_icon.svg" alt="cansel"/>
                        </button>
                        :
                        <button 
                            className="main__task_buttons-delete"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <img src="/trash_icon.svg" alt="delete"/>
                        </button>}
                    </div>
                </div>
            ))) : 
            'Загрузка...'
            }
        </div>
    )
}