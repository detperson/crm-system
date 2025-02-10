import { useState } from "react"
import { EnumSortStatus, ITodo } from "../types/todos"
import { fetchDeleteTodo, fetchEditTodo } from "../api/api"
import { MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } from "../utils/constants"

interface TodoTaskProps {
    todo: ITodo
    preload: (status?: EnumSortStatus) => Promise<void>
    filter: EnumSortStatus
}

export function TodoTask({ todo, preload, filter }: TodoTaskProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newValue, setNewValue] = useState<string>('')

    async function changeTodo(todo: ITodo, value?: string) {
        try {
            await fetchEditTodo(todo, value)
            await preload(filter)
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    function handleSaveClick() {
        //Удаляю пробелы перед сохранением
        const newValueTrim = newValue.trim()
        
        //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        if (todo.title === newValueTrim) {
            setIsEdit(false)
            return
        }

        if (newValueTrim.length >= MIN_LENGTH_MESSAGE && newValueTrim.length <= MAX_LENGTH_MESSAGE) {
            changeTodo(todo, newValueTrim)
            setIsEdit(false)
        } else {
            alert(`Значение должно быть от ${MIN_LENGTH_MESSAGE} до ${MAX_LENGTH_MESSAGE} символов`)
        }
    }

    function handleEditClick() {
        setNewValue(todo.title)
        setIsEdit(true)
    }

    async function handleDeleteTodoClick(id: number) {
        try {
            await fetchDeleteTodo(id)
            await preload(filter)
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
                {isEdit
                ?
                <input 
                    className="main__task_edit_input"
                    defaultValue={todo.title} 
                    onChange={(e) => setNewValue(e.target.value)} 
                />
                :
                <div className={todo.isDone ? 'main__task_text task_text-complited' : 'main__task_text'}>
                    {todo.title}
                </div>}
            </div>
            <div className="main__task_buttons">
                {isEdit
                ?
                <button
                    className="main__task_buttons-save"
                    onClick={handleSaveClick}
                >
                    <img src="/save_icon.svg" alt="save"/>
                </button>
                :
                <button
                    className="main__task_buttons-edit"
                    onClick={handleEditClick}
                >
                    <img src="/edit_icon.svg" alt="edit"/>
                </button>}

                {isEdit
                ? 
                <button 
                    className="main__task_buttons-canсel"
                    onClick={() => setIsEdit(false)}
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