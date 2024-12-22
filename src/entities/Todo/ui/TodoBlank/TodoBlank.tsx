import { memo, useCallback, useEffect } from 'react'

import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Input, Space } from 'antd'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './TodoBlank.module.scss'
import { getTodoValue } from '../../model/selectors/getTodoSelectors'
import { todoActions } from '../../model/slice/todoSlice'

interface TodoBlankProps {
    className?: string
    onAddTodo: (value: string) => void
}

export const TodoBlank = memo((props: TodoBlankProps) => {
    const { className, onAddTodo } = props
    const dispatch = useAppDispatch()

    const value = useSelector(getTodoValue)

    const onChangeText = useCallback(
        (value: string) => {
            dispatch(todoActions.setValue(value))
        },
        [dispatch],
    )

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText?.(e.target.value)
    }

    const onAddHandler = useCallback(() => {
        onAddTodo(value || '')
        onChangeText('')
    }, [onAddTodo, onChangeText, value])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onAddHandler()
            }
        },
        [onAddHandler],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    return (
        <div className={classNames(cls.todoBlank, {}, [className])}>
            <Card hoverable>
                <Space.Compact direction="horizontal" block>
                    <Input
                        value={value}
                        onChange={onChangeHandler}
                        placeholder="Добавьте новое задание"
                    />
                    <Button
                        icon={<PlusCircleOutlined />}
                        onClick={onAddHandler}
                    />
                </Space.Compact>
            </Card>
        </div>
    )
})
