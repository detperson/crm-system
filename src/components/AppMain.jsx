import { useState } from "react";
import Task from "./Task";

export default function AppMain({ todos, deleteTodo, changeTodo, filter }) {
    const [editing, setEditing] = useState(0)
    const [newValue, setNewValue] = useState('')


    function filteredTodos() {
        if (filter === 'all') {
            return [...todos.data]
        } else if (filter === 'in-work') {
            return todos.data.filter((todo) => !todo.isDone)
        } else if (filter === 'completed') {
            return todos.data.filter((todo) => todo.isDone)
        }
        
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

    function handleSaveClick(todo) {
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
            <h2>Main Component</h2>
            {/* {todos.data ? (todos.data.map((todo) => (
                <div className="main__task" key={todo.id}>
                    <div className="main__task_info">
                        <input 
                            type="checkbox" 
                            defaultChecked={todo.isDone}
                            onClick={() => changeTodo(todo)}
                        />
                        <div>{todo.title}</div>
                    </div>
                    <div className="main__task_buttons">
                        <button>Ред</button>
                        <button 
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))) : 
            'Загрузка...'
            } */}

            {todos.data ? (filteredTodos().map((todo) => (
                <div className="main__task" key={todo.id}>
                    <div className="main__task_info">
                        <input 
                            type="checkbox" 
                            defaultChecked={todo.isDone}
                            onClick={() => changeTodo(todo)}
                        />
                        {(editing === todo.id) 
                        ?
                        <input defaultValue={todo.title} onChange={(e) => setNewValue(e.target.value.trim())} />
                        :
                        <div>{todo.title}</div>}
                    </div>
                    <div className="main__task_buttons">
                        {(editing === todo.id)
                        ?
                        <button
                            onClick={() => handleSaveClick(todo)}
                        >
                            Сохранить
                        </button>
                        :
                        <button
                            onClick={() => {
                                setNewValue(todo.title)
                                setEditing(todo.id)
                            }}
                        >
                            Ред
                        </button>}

                        {(editing === todo.id)
                        ? 
                        <button 
                            onClick={() => setEditing(0)}
                        >
                            Отмена
                        </button>
                        :
                        <button 
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Удалить
                        </button>}
                    </div>
                </div>
            ))) : 
            'Загрузка...'
            }
            
            {/* <Task /> */}
        </div>
    )
}