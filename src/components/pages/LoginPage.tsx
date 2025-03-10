import { Button, Flex, Image, Typography } from "antd";
import { LoginForm } from "../LoginForm";
import crossIcon from '../../assets/cross_auth_icon.svg'
import { useNavigate } from "react-router-dom";

const textStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '36px',
    lineHight: '100%',
    fontWeight: 700,
    color: 'rgba(82, 82, 82, 1)',
    marginBottom: '36px'
}

export function LoginPage() {
    const navigate = useNavigate()

    return (
        <Flex
            vertical
            style={{ width: '100%', maxWidth: '420px', marginRight: '16px' }}
        >
            <Flex
                justify="flex-start"
                style={{ marginBottom: '36px' }}
            >
                <Image
                    src={crossIcon}
                    preview={false}
                    style={{ maxHeight: '72px' }}
                />
            </Flex>
            <Typography.Text style={textStyle}>
                Войди в свой Аккаунт...
            </Typography.Text>

            <LoginForm />
            
            <Button 
                type="primary" 
                size='large'
                style={{ background: '#ffe6c9', color: '#73114b' }}
                onClick={() => navigate('/auth/registration')}
            >
                Зарегистрироваться
            </Button>
        </Flex>
    )
}