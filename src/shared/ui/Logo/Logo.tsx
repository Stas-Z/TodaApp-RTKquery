import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Logo.module.scss'

interface LogoProps {
    className?: string
}

export const Logo = memo((props: LogoProps) => {
    const { className } = props

    return <div className={classNames(cls.logo, {}, [className])}>TodoApp</div>
})
