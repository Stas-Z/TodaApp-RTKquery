import { memo, useCallback, useState } from 'react'

import { Empty, Switch } from 'antd'
import { useSelector } from 'react-redux'

import { MyTodo, TodoList } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './UserTodoList.module.scss'
import {
    useDeleteUserTodo,
    useGetUserTodoList,
    useUpdateUserTodo,
} from '../../model/api/userTodoListApi'
import {
    getTodoListActive,
    getTodoListCompleted,
} from '../../model/selectors/getTodosSelector'

interface UserTodoListProps {
    className?: string
    completed?: boolean
}

export const UserTodoList = memo((props: UserTodoListProps) => {
    const { className, completed } = props

    const [isActive, setIsActive] = useState(false)
    const onChangeSwitch = useCallback(() => {
        setIsActive((prev) => !prev)
    }, [])

    const { isLoading, data: todos } = useGetUserTodoList({})
    const [deleteTodo] = useDeleteUserTodo()
    const [updateTodo] = useUpdateUserTodo()

    const dispatch = useAppDispatch()

    const todosCompleted = useSelector(getTodoListCompleted)
    const todosActive = useSelector(getTodoListActive)

    const updateTodoServer = useCallback(
        (id: string, value?: string, completed?: boolean) => {
            updateTodo({ id, value, completed })
        },
        [updateTodo],
    )
    const deleteTodoHandler = useCallback(
        async (todo: MyTodo) => {
            deleteTodo({ id: todo._id })
        },
        [deleteTodo],
    )
    const getSortedTodos = () => {
        if (completed) return todosCompleted
        if (isActive) return todosActive
        return todos
    }
    const sortTodos = getSortedTodos()

    const switchTodo = (
        <div className={cls.switch}>
            <Switch onChange={onChangeSwitch} />
        </div>
    )

    const isEmpty =
        (!sortTodos?.length && !todos?.length) ||
        (completed && !todosCompleted.length)

    if (isEmpty) {
        return (
            <Empty
                description={
                    completed
                        ? 'У вас нет завершенных дел!'
                        : 'У вас нет дел на сегодня!'
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        )
    }
    return (
        <div className={classNames(cls.userTodoList, {}, [className])}>
            {!completed && switchTodo}
            <TodoList
                todos={sortTodos || []}
                isLoading={isLoading}
                updateTodoServer={updateTodoServer}
                deleteTodoHandler={deleteTodoHandler}
            />
        </div>
    )
})
