import { memo, useCallback } from 'react'

import { TodoBlank } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './AddNewTodo.module.scss'
import { addNewTodo } from '../../model/services/addNewTodo/addNewTodo'

interface AddNewTodoProps {
    className?: string
}

export const AddNewTodo = memo((props: AddNewTodoProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    const onAddTodo = useCallback(
        (value: string) => {
            dispatch(addNewTodo(value))
        },
        [dispatch],
    )

    return (
        <div className={classNames(cls.addNewTodo, {}, [className])}>
            <TodoBlank onAddTodo={onAddTodo} />
        </div>
    )
})
