import { useEffect } from "react"
import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"
import AppSorting from "./components/AppSorting"
import { useState } from "react"
import { ITodo } from "./types/ITodo"
import { IMetaResponse } from "./types/IMetaResponse"
import { ITodoInfo } from "./types/ITodoInfo"
import { TodoSortType } from "./types/TodoSort"

function App() {
  const [todos, setTodos] = useState<IMetaResponse<ITodo, ITodoInfo>>({
    data: [],
    info: undefined,
    meta: {
      totalAmount: 0,
    },
  })
  const [filter, setFilter] = useState<TodoSortType>('all')

  async function changeTodo(todo: ITodo, value?: string): Promise<void> {
    try {
      const options = {
        method: 'PUT',
        headers: {
          //правильный Content-Type для JSON
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "isDone": (value ? todo.isDone : !todo.isDone),
          "title": (value ? value : todo.title),
        })
      }
      
      const response = await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, options)

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      preload()

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }
  
  async function createTodo(title: string) {
    try {
      const options = {
        method: 'POST',
        headers: {
          //правильный Content-Type для JSON
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "isDone": false,
          "title": title
        })
      }
      
      const response = await fetch('https://easydev.club/api/v1/todos', options)

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      preload()

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }
  
  async function deleteTodo(id: number) {
    try {
      const options = {
        method: 'DELETE'
      }
      
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, options)

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      preload()

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }

  async function preload(): Promise<void> {
    try {
      const response = await fetch('https://easydev.club/api/v1/todos')

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      const data = await response.json()
      setTodos(data)
      return data

    } catch(err) {
      console.log('Ошибка ', err)
    }
  }

  useEffect(() => {
    preload()
  }, [])

  return (
    <div className="app__container">
      <h1 className="app__logo">Todo</h1>
      <AppHeader createTodo={createTodo}/>
      <AppSorting todos={todos} filter={filter} setFilter={setFilter}/>
      <AppMain todos={todos} deleteTodo={deleteTodo} changeTodo={changeTodo} filter={filter}/>
    </div>
  )
}

export default App
