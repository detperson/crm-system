// import type { FormProps } from 'antd';
import { Button, Form, Input, FormProps } from 'antd';

type FieldType = {
    login?: string;
    password?: string;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
}

export function LoginForm() {
    return (
        <Form
            // name="basic"
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
            size='large'
        >
            <Form.Item<FieldType>
                label="Логин"
                name="login"
                rules={[
                    { required: true, message: 'Обязательное поле. Пожалуйста введите логин!' },
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
                    { required: true, message: 'Обязательное поле. Пожалуйста введите пароль!' },
                    { whitespace: true },
                    { min: 6, message: `Необходимо минимум символов 6`},
                    { max: 60, message: `Максимум символов 60`},
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    size='large'
                    style={{ width: '100%', background: 'rgba(127, 38, 91, 1)' }}
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}