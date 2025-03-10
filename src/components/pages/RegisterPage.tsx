import { Flex, Typography } from "antd";
import { RegistrationForm } from "../RegistrationForm";

const textStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '36px',
    lineHight: '100%',
    fontWeight: 700,
    color: 'rgba(82, 82, 82, 1)',
    marginBottom: '36px'
}

export function RegisterPage() {
    return (
        <Flex vertical style={{ width: '100%', maxWidth: '420px', marginRight: '16px' }}>
            <Typography.Text style={textStyle}>
                Регистрация
            </Typography.Text>

            <RegistrationForm />
        </Flex>
    )
}