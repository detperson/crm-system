import { IMetaResponse } from "../types/IMetaResponse"
import { ITodo } from "../types/ITodo"
import { ITodoInfo } from "../types/ITodoInfo"

export async function fetchData(): Promise<IMetaResponse<ITodo, ITodoInfo>> {
    try {
        const response = await fetch('https://easydev.club/api/v1/todos')

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch(err) {
        throw err
    }
}

export async function fetchAddTodo(title: string) {
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
    } catch (err) {
        throw err
    }
}

export async function fetchDeleteTodo(id: number) {
    try {
        const options = {
            method: 'DELETE'
        }

        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, options)

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`)
        }
    } catch (err) {
        throw err
    }
}

export async function fetchEditTodo(todo: ITodo, value?: string) {
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
    } catch (err) {
        throw err
    }
}