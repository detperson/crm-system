import { useEffect } from "react"
import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"
import AppSorting from "./components/AppSorting"
import { useState } from "react"
import { ITodo } from "./types/ITodo"
import { IMetaResponse } from "./types/IMetaResponse"
import { ITodoInfo } from "./types/ITodoInfo"
import { TodoSortType } from "./types/TodoSort"
import { fetchData } from "./api/api"

function App() {
  const [todos, setTodos] = useState<IMetaResponse<ITodo, ITodoInfo>>({
    data: [],
    info: undefined,
    meta: {
      totalAmount: 0,
    },
  })
  const [filter, setFilter] = useState<TodoSortType>('all')

  // async function changeTodo(todo: ITodo, value?: string): Promise<void> {
  //   try {
  //     await fetchEditTodo(todo, value)
  //     preload()
  //   } catch (err) {
  //     console.log('Ошибка ', err)
  //   }
  // }
  
  // async function createTodo(title: string) {
  //   try {
  //     await fetchAddTodo(title)
  //     preload()
  //   } catch (err) {
  //     console.log('Ошибка ', err)
  //   }
  // }
  
  // async function deleteTodo(id: number) {
  //   try {
  //     await fetchDeleteTodo(id)
  //     preload()
  //   } catch (err) {
  //     console.log('Ошибка ', err)
  //   }
  // }

  async function preload() {
    try {
      const data = await fetchData()
      setTodos(data)
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
      <AppHeader preload={preload}/>
      <AppSorting todos={todos} filter={filter} setFilter={setFilter}/>
      <AppMain todos={todos} preload={preload} filter={filter}/>
    </div>
  )
}

export default App