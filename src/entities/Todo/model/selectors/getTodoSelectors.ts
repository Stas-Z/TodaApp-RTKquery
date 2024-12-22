import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { MyTodoSchema } from '../types/todo'

const getTodoSelector = (state: StateSchema) => state.todo

export const getTodoValue = createSelector(
    getTodoSelector,
    (Todo: MyTodoSchema) => Todo.value,
)
