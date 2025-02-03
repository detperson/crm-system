import { useState } from "react"

interface AppHeaderProps {
    createTodo: (title: string) => void
}

export default function AppHeader({ createTodo }: AppHeaderProps) {
    const [error, setError] = useState('')

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form[0] as HTMLInputElement
        let value = input.value.trim()

        //Валидация
        if (value.length >= 2 && value.length <= 64) {
            createTodo(value.toString()) //toString на всякий случай
        } else {
            setError('Кол-во символов min 2 max 64')
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