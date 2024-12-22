import { memo, useCallback, useState } from 'react'

import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Skeleton, Space } from 'antd'

import { formatDate } from '@/shared/helpers/formatDate/formatDate'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TodoItem.module.scss'
import { MyTodo } from '../../model/types/todo'

interface TodoItemProps {
    className?: string
    todo: MyTodo
    isLoading?: boolean
    updateTodoServer: (id: string, value?: string, completed?: boolean) => void
    updateTodoAction: (id: string, value?: string, completed?: boolean) => void
    deleteTodoHandler: (todo: MyTodo) => void
}

export const TodoItem = memo((props: TodoItemProps) => {
    const {
        className,
        todo,
        updateTodoServer,
        updateTodoAction,
        isLoading,
        deleteTodoHandler,
    } = props

    const [initValue, setInitValue] = useState(todo.value)
    const [inputValue, setInputValue] = useState(todo.value)
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onChangeText = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            updateTodoAction(todo._id, e.target.value)
        },
        [updateTodoAction, todo._id],
    )

    const handleBlur = useCallback(() => {
        if (initValue !== inputValue) {
            updateTodoServer(todo._id, inputValue)
            setInitValue(inputValue)
        }
    }, [initValue, inputValue, todo._id, updateTodoServer])

    const handleCompleted = useCallback(() => {
        updateTodoAction(todo._id, todo.value, !todo.completed)
        updateTodoServer(todo._id, todo.value, !todo.completed)
    }, [
        todo._id,
        todo.completed,
        todo.value,
        updateTodoAction,
        updateTodoServer,
    ])

    const onClickDelete = useCallback(() => {
        deleteTodoHandler(todo)
    }, [deleteTodoHandler, todo])

    const formattedDate = formatDate(todo.createdAt)

    return (
        <Skeleton loading={isLoading} active>
            <Card
                hoverable
                className={classNames(
                    cls.card,
                    {
                        [cls.completed]: todo.completed,
                        [cls.completedCard]: todo.completed,
                    },
                    [className],
                )}
            >
                <Space.Compact block>
                    <Button
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={onShowModal}
                    />
                    <Input
                        value={todo.value}
                        onChange={onChangeText}
                        onBlur={handleBlur}
                        size="large"
                    />
                    <Button
                        size="large"
                        onClick={handleCompleted}
                        icon={
                            <CheckCircleOutlined className={cls.buttonBlue} />
                        }
                    />
                </Space.Compact>
                <div className={cls.date}>{formattedDate}</div>
            </Card>
            <Modal
                open={isAuthModal}
                title="Вы действительно хотите удалить этот Todo?"
                onCancel={onCloseModal}
                centered
                okText="Удалить"
                okType="danger"
                onOk={onClickDelete}
            />
        </Skeleton>
    )
})
