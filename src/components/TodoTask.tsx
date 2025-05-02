import { useState } from "react"
import { ITodo } from "../types/todoTypes"
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
    }

    function handleEditClick() {
        setIsEdit(true)
    }

    async function handleDeleteTodoClick() {
        try {
            await fetchDeleteTodo(todo.id)
            await preloadWithFilter()
        } catch(err) {
            console.log('Ошибка ', err)
        }
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        //Сделал проверку потому что ts пишет, что может быть undefined
        let valueTrim = values.todoText ? values.todoText.trim() : ''

        //Что бы не отправлялись лишние запросы на бекенд если ничео не поменялось
        if (todo.title === valueTrim) {
            setIsEdit(false)
            return
        }

        changeTodo(todo, valueTrim)
        // form.resetFields() //очищает форму 
        setIsEdit(false)
        
    }

    function handleCancelClick() {
        form.resetFields()
        setIsEdit(false)
    }

    
    return (
        <div className="main__task" key={todo.id}>
            <div className="main__task_info">
                <Checkbox 
                    onClick={() => changeTodo(todo)} 
                    defaultChecked={todo.isDone}
                />
                {isEdit
                ?
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
                //Сохранить кнопка
                <Button 
                    color="lime" 
                    variant="solid"
                    style={buttonStyle}
                    onClick={handleSaveClick}
                    icon={<CheckCircleOutlined />} 
                />
                :
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
                //Кнопка отмены
                <Button 
                    color="default" 
                    variant="filled"
                    style={buttonStyle}
                    onClick={handleCancelClick}
                    icon={<CloseCircleOutlined />} 
                />
                :
                //Удалить кнопка
                <Button 
                    color="danger" 
                    variant="solid"
                    style={buttonStyle}
                    onClick={handleDeleteTodoClick} 
                    icon={<DeleteOutlined />} 
                />
                }
            </div>
        </div>
    )
}