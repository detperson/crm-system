import { fetchAddTodo } from "../api/api"
import { MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } from "../utils/constants"
import { Button, Form, FormProps, Input } from "antd"

interface TodoHeaderProps {
    preloadWithFilter: () => Promise<void>
}

type FieldType = {
    taskName?: string;
};

const addButtonStyle: React.CSSProperties = {
    fontFamily: '"Roboto", serif',
    fontSize: '14px',
    fontWeight: 400,
    width: '110px',
    marginLeft: '10px',
}

const inputStyle: React.CSSProperties = {
    fontFamily: '"Roboto", serif',
    fontSize: '16px',
    fontWeight: 400,
    borderBottom: '1px solid #00000033',
}

export default function TodoHeader({ preloadWithFilter }: TodoHeaderProps) {

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        let value = values.taskName?.trim()

        try {
            if (value) {
                await fetchAddTodo(value)
                await preloadWithFilter()
            }
        } catch(err) {
            console.log('Ошибка ', err)
        }
    };
    
    return (
        <div>
            <Form 
                name="basic"
                style={{
                    maxWidth: '600',
                    display: 'flex',
                }}
                // не знаю зачем initialValues, в примере было
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    style={{width: '100%'}}
                    label={null}
                    name="taskName"
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
                        placeholder="Task To Be Done..."
                        variant="underlined"
                    />
                </Form.Item>
                <Form.Item label={null}>
                    <Button
                        style={addButtonStyle}
                        size="large"
                        type="primary" 
                        htmlType="submit"
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}