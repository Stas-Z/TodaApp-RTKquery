import { memo, useCallback, useState } from 'react'

import { Button } from 'antd'
import { useSelector } from 'react-redux'

import { getUserAuthData, userActions } from '@/entities/User'
import { LoginModal } from '@/features/AuthorizationForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props

    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useAppDispatch()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const text = authData ? 'Выйти' : 'Войти'

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                onClick={authData ? onLogout : onShowModal}
                className={cls.button}
                type="primary"
                size="large"
            >
                {text}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    )
})
