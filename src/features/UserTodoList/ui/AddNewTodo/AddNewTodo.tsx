import { memo, useCallback } from 'react'

import { TodoBlank } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AddNewTodo.module.scss'
import { useAddNewUserTodo } from '../../model/api/userTodoListApi'

interface AddNewTodoProps {
    className?: string
}

export const AddNewTodo = memo((props: AddNewTodoProps) => {
    const { className } = props

    const [addNewTodo] = useAddNewUserTodo()

    const onAddTodo = useCallback(
        (value: string) => {
            addNewTodo({ value })
        },
        [addNewTodo],
    )

    return (
        <div className={classNames(cls.addNewTodo, {}, [className])}>
            <TodoBlank onAddTodo={onAddTodo} />
        </div>
    )
})
