import { useEffect } from "react"
import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"
import AppSorting from "./components/AppSorting"
import { useState } from "react"

function App() {
  const [todos, setTodos] = useState({})
  const [filter, setFilter] = useState('all')

  async function changeTodo(todo, value) {
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
      console.log('Изменил todo')

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }
  
  async function createTodo(title) {
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
      console.log('Создал todo')

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }
  
  async function deleteTodo(id) {
    try {
      const options = {
        method: 'DELETE'
      }
      
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, options)

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      preload()
      console.log('Удалил todo')

    } catch (err) {
      console.log('Ошибка ', err)
    }
  }

  async function preload() {
    try {
      const response = await fetch('https://easydev.club/api/v1/todos')

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      const data = await response.json()
      setTodos(data)
      console.log('response data', data)

    } catch(err) {
      console.log('Ошибка ', err)
    }
  }

  useEffect(() => {
    preload()
  }, [])

  return (
    <>
      <h1>Todo list app</h1>
      <AppHeader createTodo={createTodo}/>
      <AppSorting todos={todos} setFilter={setFilter}/>
      <AppMain todos={todos} deleteTodo={deleteTodo} changeTodo={changeTodo} filter={filter}/>
    </>
  )
}

export default App
