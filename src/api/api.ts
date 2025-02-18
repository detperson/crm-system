import { EnumSortStatus, IMetaResponse } from "../types/todos"
import { ITodo } from "../types/todos"
import { ITodoInfo } from "../types/todos"
import axios from "axios"

const BASE_URL = 'https://easydev.club/api/v1'

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
        
        const response = await axios.get<IMetaResponse<ITodo, ITodoInfo>>(`${BASE_URL}/todos`, config)

        return response.data
    } catch(err) {
        throw err
    }
}

export async function fetchAddTodo(title: string) {
    try {
        await axios.post(`${BASE_URL}/todos`, {
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
        await axios.delete(`${BASE_URL}/todos/${id}`)

    } catch (err) {
        throw err
    }
}

export async function fetchEditTodo(todo: ITodo, value?: string) {
    try {

        await axios.put(`${BASE_URL}/todos/${todo.id}`, {
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

// export async function fetchData(status?: EnumSortStatus): Promise<IMetaResponse<ITodo, ITodoInfo>> {
//     try {
//         let params = new URLSearchParams()

//         if (status) {
//             params.append('filter', status)
//         }

//         const response = await fetch(`${BASE_URL}/todos${status ? '?' + params : ''}`)

//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.statusText}`)
//         }

//         const data = await response.json()
//         return data
//     } catch(err) {
//         throw err
//     }
// }


// export async function fetchAddTodo(title: string) {
//     try {
//         const options = {
//             method: 'POST',
//             headers: {
//             //правильный Content-Type для JSON
//             'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//             "isDone": false,
//             "title": title
//             })
//         }

//         const response = await fetch(`${BASE_URL}/todos`, options)

//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.statusText}`)
//         }
//     } catch (err) {
//         throw err
//     }
// }


// export async function fetchDeleteTodo(id: number) {
//     try {
//         const options = {
//             method: 'DELETE'
//         }

//         const response = await fetch(`${BASE_URL}/todos/${id}`, options)

//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.statusText}`)
//         }
//     } catch (err) {
//         throw err
//     }
// }


// export async function fetchEditTodo(todo: ITodo, value?: string) {
//     try {
//         const options = {
//             method: 'PUT',
//             headers: {
//             //правильный Content-Type для JSON
//             'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//             "isDone": (value ? todo.isDone : !todo.isDone),
//             "title": (value ? value : todo.title),
//             })
//         }

//         const response = await fetch(`${BASE_URL}/todos/${todo.id}`, options)

//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.statusText}`)
//         }
//     } catch (err) {
//         throw err
//     }
// }