import { useState } from "react"
import { ITodo } from "../types/ITodo"
import { fetchDeleteTodo, fetchEditTodo } from "../api/api"

interface TodoTaskProps {
    todo: ITodo
    preload: () => Promise<void>
}

export function TodoTask({ todo, preload }: TodoTaskProps) {
    const [editing, setEditing] = useState(false)
    const [newValue, setNewValue] = useState('')

    async function changeTodo(todo: ITodo, value?: string) {
        try {
            await fetchEditTodo(todo, value)
            await preload()
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    function handleSaveClick(todo: ITodo) {
        //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        if (todo.title === newValue) {
            setEditing(false)
            return
        }

        if (newValue.length >= 2 && newValue.length <= 64) {
            changeTodo(todo, newValue)
            setEditing(false)
        } else {
            alert('Значение должно быть от 2 до 64 символов')
        }
    }

    async function handleDeleteTodoClick(id: number) {
        try {
            await fetchDeleteTodo(id)
            await preload()
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }
    
    return (
        <div className="main__task" key={todo.id}>
            <div className="main__task_info">
                <input 
                    className="main__task_checkbox"
                    type="checkbox" 
                    defaultChecked={todo.isDone}
                    onClick={() => changeTodo(todo)}
                />
                {editing
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
                {editing
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
                        setEditing(true)
                    }}
                >
                    <img src="/edit_icon.svg" alt="edit"/>
                </button>}

                {editing
                ? 
                <button 
                    className="main__task_buttons-canсel"
                    onClick={() => setEditing(false)}
                >
                    <img src="/cancel_icon.svg" alt="cancel"/>
                </button>
                :
                <button 
                    className="main__task_buttons-delete"
                    onClick={() => handleDeleteTodoClick(todo.id)}
                >
                    <img src="/trash_icon.svg" alt="delete"/>
                </button>}
            </div>
        </div>
    )
}