import {
    MutableRefObject,
    RefObject,
    memo,
    useCallback,
    useEffect,
    useRef,
} from 'react'

import { Button, Input, Space, Typography } from 'antd'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './LoginForm.module.scss'
import { useAuthByMail, useRegByMail } from '../../model/api/userAuthApi'
import { AuthType } from '../../model/consts/authConsts'
import {
    getAuthView,
    getEmail,
    getPassword,
} from '../../model/selectors/getLoginState/getLoginState'
import { regActions } from '../../model/slice/regSlice'
import { AuthTypeTabs } from '../AuthTypeTabs/AuthTypeTabs'

export interface LoginFormProps {
    className?: string
    onSuccess?: () => void
}

const { Text } = Typography

const LoginForm = (props: LoginFormProps) => {
    const { className, onSuccess } = props

    const dispatch = useAppDispatch()

    const password = useSelector(getPassword)
    const email = useSelector(getEmail)
    const view = useSelector(getAuthView)

    const [login, { isLoading }] = useAuthByMail()
    const [registration, { error, data }] = useRegByMail()

    const timerRef = useRef<NodeJS.Timeout | null>(null) as MutableRefObject<
        ReturnType<typeof setTimeout>
    >

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setUsername(e.target.value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setPassword(e.target.value))
        },
        [dispatch],
    )

    const loginHandler = useCallback(async () => {
        await login({ email, password }).unwrap()
        onSuccess?.()
    }, [email, login, onSuccess, password])

    const onButtonClickHandler = useCallback(async () => {
        if (view === AuthType.REG) {
            try {
                await registration({ email, password }).unwrap()
                timerRef.current = setTimeout(() => {
                    loginHandler()
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        }
        if (view === AuthType.AUTH) {
            try {
                loginHandler()
            } catch (error) {
                console.log(error)
            }
        }
    }, [email, loginHandler, password, registration, view])

    const onChangeHandler = (view: AuthType) => {
        dispatch(regActions.setView(view))
    }

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onButtonClickHandler()
            }
        },
        [onButtonClickHandler],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    const errorMessage = (
        <Text type="danger">
            {error &&
                'data' in error &&
                (error.data as { message?: string }).message}
        </Text>
    )
    const succesMessage = <Text type="success">{data?.message}</Text>
    const buttonText = view === AuthType.AUTH ? 'Войти' : 'Зарегистрировать'
    const messageServer = (
        <Text type="warning">
            Ожидайте загрузку! Так как используется бесплатный сервер, время
            первой загрузки может занять некоторое время.
        </Text>
    )

    return (
        <div className={classNames(cls.loginForm, {}, [className])}>
            <AuthTypeTabs value={view} onChangeType={onChangeHandler} />
            <Space direction="vertical" size="large">
                {error && errorMessage}
                {data && succesMessage}
                <Input
                    autoFocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите ваш email"
                    onChange={onChangeEmail}
                    value={email}
                    size="large"
                />
                <Input.Password
                    className={cls.input}
                    placeholder="Введите ваш пароль"
                    onChange={onChangePassword}
                    value={password}
                    size="large"
                />
                {isLoading && messageServer}
                <Button
                    onClick={onButtonClickHandler}
                    loading={isLoading}
                    type="primary"
                    block
                    size="large"
                >
                    {buttonText}
                </Button>
            </Space>
        </div>
    )
}

export default memo(LoginForm)
