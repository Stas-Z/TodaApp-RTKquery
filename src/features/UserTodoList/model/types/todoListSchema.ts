import { EntityState } from '@reduxjs/toolkit'

import { MyTodo } from '@/entities/Todo'

export interface TodoListSchema extends EntityState<MyTodo, string> {
    isLoading?: boolean
    error?: string
    search: string
}
