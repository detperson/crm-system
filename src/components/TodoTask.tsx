import { useState } from "react"
import { ITodo } from "../types/todos"
import { fetchDeleteTodo, fetchEditTodo } from "../api/api"
import { MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } from "../utils/constants"
import { Button, Checkbox, Form, FormProps, Input, Typography } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"

interface TodoTaskProps {
    todo: ITodo
    preloadWithFilter: () => Promise<void>
}

type FieldType = {
    todoText?: string;
}

const buttonStyle: React.CSSProperties = {
    width: '46px',
    height: '34px'
}

const todoTextIsDoneStyle: React.CSSProperties = {
    color: '#76777b',
    textDecoration: 'line-through',
}

const inputStyle: React.CSSProperties = {
    fontFamily: '"Roboto", serif',
    fontSize: '14px',
    fontWeight: 400,
    borderBottom: '1px solid #00000033',
}


export function TodoTask({ todo, preloadWithFilter }: TodoTaskProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newValue, setNewValue] = useState<string>('')
    const [form] = Form.useForm()

    async function changeTodo(todo: ITodo, value?: string) {
        try {
            await fetchEditTodo(todo, value)
            await preloadWithFilter()
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    function handleSaveClick() {
        form.submit()
        // //Удаляю пробелы перед сохранением
        // const newValueTrim = newValue.trim()
        
        // //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        // if (todo.title === newValueTrim) {
        //     setIsEdit(false)
        //     return
        // }

        // if (newValueTrim.length >= MIN_LENGTH_MESSAGE && newValueTrim.length <= MAX_LENGTH_MESSAGE) {
        //     changeTodo(todo, newValueTrim)
        //     setIsEdit(false)
        // } else {
        //     alert(`Значение должно быть от ${MIN_LENGTH_MESSAGE} до ${MAX_LENGTH_MESSAGE} символов`)
        // }
    }

    function handleEditClick() {
        setNewValue(todo.title)
        setIsEdit(true)
    }

    async function handleDeleteTodoClick(id: number) {
        try {
            await fetchDeleteTodo(id)
            await preloadWithFilter()
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async () => {
        console.log('форма отправилась onFinish')
        let newValueTrim = newValue.trim()

        //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        if (todo.title === newValueTrim) {
            setIsEdit(false)
            return
        }

        changeTodo(todo, newValueTrim)
        // form.resetFields() //очищает форму 
        setIsEdit(false)
        
    };

    
    return (
        <div className="main__task" key={todo.id}>
            <div className="main__task_info">
                {/* <input 
                    className="main__task_checkbox"
                    type="checkbox" 
                    defaultChecked={todo.isDone}
                    onClick={() => changeTodo(todo)}
                /> */}
                <Checkbox 
                    onClick={() => changeTodo(todo)} 
                    defaultChecked={todo.isDone}
                />
                {isEdit
                ?
                // <input 
                //     className="main__task_edit_input"
                //     defaultValue={todo.title} 
                //     onChange={(e) => setNewValue(e.target.value)} 
                // />
                (<Form 
                    name={`editTodoForm${todo.id}`}
                    form={form}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        style={{width: '100%'}}
                        label={null}
                        name="todoText"
                        initialValue={todo.title}
                        rules={[
                            {
                                required: true,
                                message: 'Please input task name!',
                            },
                            {
                                min: MIN_LENGTH_MESSAGE,
                                message: `Необходимо минимум символов ${MIN_LENGTH_MESSAGE}`
                            },
                            {
                                max: MAX_LENGTH_MESSAGE,
                                message: `Максимум символов ${MAX_LENGTH_MESSAGE}`
                            },
                            {
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input
                            size={'large'}
                            style={inputStyle}
                            variant="underlined"
                            onChange={(e) => setNewValue(e.target.value)}
                        />
                    </Form.Item>
                </Form>)
                :
                <Typography.Text style={todo.isDone ? todoTextIsDoneStyle : {}} >{todo.title}</Typography.Text>
                }
            </div>
            <div className="main__task_buttons">
                {isEdit
                ?
                // <button
                //     className="main__task_buttons-save"
                //     onClick={handleSaveClick}
                // >
                //     <img src="/save_icon.svg" alt="save"/>
                // </button>
                //Сохранить кнопка
                <Button 
                    color="lime" 
                    variant="solid"
                    style={buttonStyle}
                    onClick={handleSaveClick}
                    icon={<CheckCircleOutlined />} 
                />
                :
                // <button
                //     className="main__task_buttons-edit"
                //     onClick={handleEditClick}
                // >
                //     <img src="/edit_icon.svg" alt="edit"/>
                // </button>
                //Редактировать кнопка
                <Button 
                    color="primary" 
                    variant="solid"
                    style={buttonStyle}
                    onClick={handleEditClick} 
                    icon={<EditOutlined />} 
                />
                }

                {isEdit
                ? 
                // <button 
                //     className="main__task_buttons-canсel"
                //     onClick={() => setIsEdit(false)}
                // >
                //     <img src="/cancel_icon.svg" alt="cancel"/>
                // </button>
                //Кнопка отмены
                <Button 
                    color="default" 
                    variant="filled"
                    style={buttonStyle}
                    onClick={() => {
                        form.resetFields()
                        setIsEdit(false)//сделать отд функцию
                    }}
                    icon={<CloseCircleOutlined />} 
                />
                :
                // <button 
                //     className="main__task_buttons-delete"
                //     onClick={() => handleDeleteTodoClick(todo.id)}
                // >
                //     <img src="/trash_icon.svg" alt="delete"/>
                // </button>
                //Удалить кнопка
                <Button 
                    color="danger" 
                    variant="solid"
                    style={buttonStyle}
                    onClick={() => handleDeleteTodoClick(todo.id)} 
                    icon={<DeleteOutlined />} 
                />
                }
            </div>
        </div>
    )
}