import { Profile, UserRegistration } from "../types/authTypes"
import { ITodo, ITodoInfo, EnumSortStatus, IMetaResponse } from "../types/todoTypes"
import axios from "axios"

const BASE_URL = 'https://easydev.club/api/v1'

const instanceUrl = axios.create({
    baseURL: BASE_URL,
    headers: {
        // правильный Content-Type для JSON
        'Content-Type': 'application/json;charset=utf-8'
    }
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
        })

    } catch (err) {
        throw err
    }
}

//Registration

export async function fetchRegistration(bodyRegRequest: UserRegistration) {
    try {
        const response = await instanceUrl.post<Profile>('/auth/signup', bodyRegRequest)

        return response
    } catch (err) {
        throw err
    }
}