import { useState } from "react"
import { fetchAddTodo } from "../api/api"
import { MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } from "../utils/constants"

interface TodoHeaderProps {
    preloadWithFilter: () => Promise<void>
}

export default function TodoHeader({ preloadWithFilter }: TodoHeaderProps) {
    const [error, setError] = useState<string>('')

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form[0] as HTMLInputElement
        let value = input.value.trim()

        //Валидация
        if (value.length >= MIN_LENGTH_MESSAGE && value.length <= MAX_LENGTH_MESSAGE) {
            try {
                await fetchAddTodo(value)
                await preloadWithFilter() //фильтр уже подставлен в компоненте TodoPage заранее, при передаче в пропс
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