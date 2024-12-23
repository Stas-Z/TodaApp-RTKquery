import { memo } from 'react'

import { UserTodoList } from '@/features/UserTodoList'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoCompletedPage.module.scss'

interface TodoCompletedPageProps {
    className?: string
}

const TodoCompletedPage = memo((props: TodoCompletedPageProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.todoCompletedPage, {}, [className])}>
            <div className={cls.title}>Завершенные дела</div>
            <UserTodoList completed />
        </div>
    )
})

export default TodoCompletedPage
