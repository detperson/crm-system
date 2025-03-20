//Расшифровка ошибок
export function understandebleErrorMessage(errorCode: string): string {
    if (errorCode === '400') {
        return 'Ошибка десериализации запроса или неверный ввод.'
    } else if (errorCode === '401') {
        return 'Неверные учетные данные.'
    } else if (errorCode === '409') {
        return 'Пользователь уже существует.'
    } else if (errorCode === '500') {
        return 'Внутренняя ошибка сервера.'
    } else {
        return 'Произошла неизвестная ошибка.'
    }
}
