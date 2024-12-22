import { memo, useCallback, useEffect, useState } from 'react'

import { Empty, Switch } from 'antd'
import { useSelector } from 'react-redux'

import { MyTodo, TodoList } from '@/entities/Todo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './UserTodoList.module.scss'
import {
    getTodoListActive,
    getTodoListCompleted,
    getTodoListIsLoading,
    getTodosList,
} from '../../model/selectors/getTodosSelector'
import { deleteTodo } from '../../model/services/deleteTodo/deleteTodo'
import { fetchTodoList } from '../../model/services/fetchTodoList/fetchTodoList'
import { updateTodo } from '../../model/services/updateTodo/updateTodo'
import { todoListActions } from '../../model/slice/todoListSlice'

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

    const dispatch = useAppDispatch()

    const todos = useSelector(getTodosList)
    const todosCompleted = useSelector(getTodoListCompleted)
    const todosActive = useSelector(getTodoListActive)
    const isLoading = useSelector(getTodoListIsLoading)

    useEffect(() => {
        if (!todos.length) {
            dispatch(fetchTodoList({}))
        }
        // eslint-disable-next-line
    }, [dispatch])

    const updateTodoAction = (
        id: string,
        value?: string,
        completed?: boolean,
    ) => {
        dispatch(
            todoListActions.updateTodo({
                id,
                changes: { value, completed },
            }),
        )
    }

    const updateTodoServer = useCallback(
        (id: string, value?: string, completed?: boolean) => {
            dispatch(updateTodo({ id, value, completed }))
        },
        [dispatch],
    )
    const deleteTodoHandler = useCallback(
        async (todo: MyTodo) => {
            const backUpTodo = { ...todo }

            dispatch(todoListActions.deleteTodo(todo._id))

            try {
                const id = todo._id
                await dispatch(deleteTodo({ id })).unwrap()
            } catch (e) {
                if (backUpTodo) {
                    dispatch(todoListActions.setTodo(backUpTodo))
                }
                console.error('Failed to update todo:', e)
            }
        },
        [dispatch],
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
        (!sortTodos.length && !todos.length) ||
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
                todos={sortTodos}
                isLoading={isLoading}
                updateTodoServer={updateTodoServer}
                updateTodoAction={updateTodoAction}
                deleteTodoHandler={deleteTodoHandler}
            />
        </div>
    )
})
