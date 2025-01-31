import { useState } from "react"

export default function AppHeader({ createTodo }) {
    const [error, setError] = useState('')


    function submitForm(e) {
        e.preventDefault()
        let value = e.target[0].value.trim()

        if (value.length >= 2 && value.length <= 64) {
            createTodo(value.toString()) //toString на всякий случай
        } else {
            setError('Кол-во символов min 2 max 64')
            console.log('Ошибка строка меньше 2 или больше 64 символов')
            return
        }
        
        e.target[0].value = ''
    }
    
    return (
        <div>
            <h2 className="header__color">Header!</h2>
            <form onSubmit={submitForm}>
                <input 
                    placeholder="Task To Be Done..."
                    type="text"
                    onFocus={() => setError('')}
                />
                <button 
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