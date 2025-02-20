import { EnumSortStatus, IMetaResponse } from "../types/todos"
import { ITodo } from "../types/todos"
import { ITodoInfo } from "../types/todos"
import axios from "axios"

const BASE_URL = 'https://easydev.club/api/v1'

const instanceUrl = axios.create({
    baseURL: BASE_URL,
})

export async function fetchData(status?: EnumSortStatus): Promise<IMetaResponse<ITodo, ITodoInfo>> {
    try {
        let config = {}

        if (status) {
            config = {
                params: {
                    filter: status
                }
            }
        }
        
        const response = await instanceUrl.get<IMetaResponse<ITodo, ITodoInfo>>(`/todos`, config)

        return response.data
    } catch(err) {
        throw err
    }
}

export async function fetchAddTodo(title: string) {
    try {
        await instanceUrl.post(`/todos`, {
            "isDone": false,
            "title": title
        },
        {
            headers: {
                //правильный Content-Type для JSON
                'Content-Type': 'application/json;charset=utf-8'
            }
        })

    } catch (err) {
        throw err
    }
}

export async function fetchDeleteTodo(id: number) {
    try {
        await instanceUrl.delete(`/todos/${id}`)

    } catch (err) {
        throw err
    }
}

export async function fetchEditTodo(todo: ITodo, value?: string) {
    try {

        await instanceUrl.put(`/todos/${todo.id}`, {
            "isDone": (value ? todo.isDone : !todo.isDone),
            "title": (value ? value : todo.title),
        }, {
            headers: {
                //правильный Content-Type для JSON
                'Content-Type': 'application/json;charset=utf-8'
            }
        })

    } catch (err) {
        throw err
    }
}