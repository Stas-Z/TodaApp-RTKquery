import { Suspense } from 'react'

import { Modal, Spin } from 'antd'

import { classNames } from '@/shared/lib/classNames/classNames'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const { className, isOpen, onClose } = props

    return (
        <Modal
            className={classNames('', {}, [className])}
            footer={null}
            open={isOpen}
            onCancel={onClose}
            onOk={onClose}
            centered
        >
            <Suspense fallback={<Spin />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    )
}
