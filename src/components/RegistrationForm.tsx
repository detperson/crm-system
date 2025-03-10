import { Button, Form, FormProps, Input, Modal, Result } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
    username: string;
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    phoneNumber?: string;
}

export function RegistrationForm() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [isSuccessForm, setIsSuccessForm] = useState(true)
    const isSuccessForm = true //Это удача или неудача, какую форму показывать
    const navigate = useNavigate()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        setIsModalOpen(true)
    }

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            <Form
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
                // size='large'
            >
                <Form.Item<FieldType>
                    label="Имя пользователя"
                    name="username"
                    rules={[
                        { required: true, message: 'Пожалуйста введите имя пользователя!' },
                        { whitespace: true },
                        { min: 1, message: `Необходимо минимум символов 1`},
                        { max: 60, message: `Максимум символов 60`},
                        () => ({
                            validator(_, value) {
                                const regexp = /^[a-zA-Zа-яА-ЯёЁ]+$/
                                if (!value || regexp.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Имя пользователя может содержать только русские и латинские буквы!'));
                            },
                        })
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    rules={[
                        { required: true, message: 'Пожалуйста введите логин!' },
                        { whitespace: true },
                        { min: 2, message: `Необходимо минимум символов 2`},
                        { max: 60, message: `Максимум символов 60`},
                        () => ({
                            validator(_, value) {
                                const regexp = /^[a-zA-Z]+$/
                                if (!value || regexp.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Логин может содержать только латинские буквы!'));
                            },
                        })
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: 'Пожалуйста введите пароль!' },
                        { whitespace: true },
                        { min: 6, message: `Необходимо минимум символов 6`},
                        { max: 60, message: `Максимум символов 60`},
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Повторите пароль"
                    name="repeatPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Пожалуйства повторите параль!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароль должен совпадать!'));
                            },
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        { type: 'email', message: 'The input is not valid Email!' },
                        { required: true, message: 'Пожалуйста введите Email!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Телефон"
                    name="phoneNumber"
                    rules={[
                        () => ({
                            validator(_, value) {
                                const phoneRegexp = /^(?:\+?\d{1,3})?(\d{10})$/
                                if (!value || phoneRegexp.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Введите верный номер телефона, без проболов, тире и скобок!'));
                            },
                        })
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        // size='large'
                        style={{ width: '100%', background: 'rgba(127, 38, 91, 1)' }}
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Result
                    status={isSuccessForm ? "success" : "warning"}
                    title={isSuccessForm ? "Регистрация прошла успешно!" : "Что-то пошло не так"}
                    subTitle={isSuccessForm ? 
                        "Для входа в систему перейдите на страницу авторизации." 
                        : 
                        "Такой пользователь уже существует или ошибка сервера."
                    }
                    extra={[
                        <Button 
                            type={isSuccessForm ? "primary" : 'default'}
                            key="buy"
                            onClick={isSuccessForm ? (() => navigate('/auth/login')) : handleCancel}
                        >
                            {isSuccessForm ? 'Войти' : 'Попробовать снова'}
                        </Button>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Modal>
        </>
    )
}