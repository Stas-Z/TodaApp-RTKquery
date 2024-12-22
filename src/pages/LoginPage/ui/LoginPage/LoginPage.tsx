import { Suspense, memo } from 'react'

import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { getRouteTodo } from '@/shared/const/router'

interface LoginPageProps {
    className?: string
}
const { Title, Paragraph } = Typography

const LoginPage = (props: LoginPageProps) => {
    const { className } = props

    const location = useLocation()

    const authData = useSelector(getUserAuthData)

    if (authData) {
        return (
            <Navigate to={getRouteTodo()} state={{ from: location }} replace />
        )
    }

    return (
        <Suspense fallback="">
            <Title>Добро пожаловать в TodoApp!</Title>
            <Paragraph>
                Ваш персональный помощник для планирования задач и повышения
                продуктивности.
            </Paragraph>
            <Paragraph>
                🔹 Чтобы начать использовать приложение, зарегистрируйтесь или
                войдите в свою учётную запись.
            </Paragraph>
            <Paragraph>
                🔹 Управляйте своими задачами легко и эффективно: добавляйте,
                редактируйте и отмечайте выполненные задачи в пару кликов!
            </Paragraph>
            <Paragraph>Готовы организовать свой день? Начнём!</Paragraph>
        </Suspense>
    )
}
export default memo(LoginPage)
