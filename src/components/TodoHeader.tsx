import { useState } from "react"
import { fetchAddTodo } from "../api/api"
import { MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } from "../utils/constants"
import { EnumSortStatus } from "../types/todos"

interface TodoHeaderProps {
    preload: (status?: EnumSortStatus) => Promise<void>
    filter: EnumSortStatus
}

export default function TodoHeader({ preload, filter }: TodoHeaderProps) {
    const [error, setError] = useState<string>('')

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form[0] as HTMLInputElement
        let value = input.value.trim()

        //Валидация
        if (value.length >= MIN_LENGTH_MESSAGE && value.length <= MAX_LENGTH_MESSAGE) {
            try {
                await fetchAddTodo(value.toString()) //toString на всякий случай
                await preload(filter)
            } catch(err) {
                console.log('Ошибка ', err)
            }
        } else {
            setError(`Кол-во символов min ${MIN_LENGTH_MESSAGE} max ${MAX_LENGTH_MESSAGE}`)
            return
        }
        
        setError('')
        input.value = ''
    }
    
    return (
        <div>
            <form 
                className="header__form"
                onSubmit={submitForm}
            >
                <input
                    className="header__input"
                    placeholder="Task To Be Done..."
                    type="text"
                    onFocus={() => setError('')}
                />
                <button 
                    className="header__add-button"
                    type="submit"
                >Add
                </button>
            </form>
            {error && 
                <span style={{color: 'red'}}>{error}</span>
            }
        </div>
    )
}