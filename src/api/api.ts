import { EnumSortStatus, IMetaResponse } from "../types/todos"
import { ITodo } from "../types/todos"
import { ITodoInfo } from "../types/todos"

const BASE_URL = 'https://easydev.club/api/v1'

export async function fetchData(status?: EnumSortStatus): Promise<IMetaResponse<ITodo, ITodoInfo>> {
    try {
        let params = new URLSearchParams()

        if (status) {
            params.append('filter', status)
        }
        
        const response = await fetch(`${BASE_URL}/todos${status ? '?' + params : ''}`)

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

        const response = await fetch(`${BASE_URL}/todos`, options)

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

        const response = await fetch(`${BASE_URL}/todos/${id}`, options)

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

        const response = await fetch(`${BASE_URL}/todos/${todo.id}`, options)

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`)
        }
    } catch (err) {
        throw err
    }
}