import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { todosAdapter } from '../slice/todoListSlice'
import { TodoListSchema } from '../types/todoListSchema'

const selectUserTodosState = (state: StateSchema) =>
    state.todosList || todosAdapter.getInitialState()

export const getTodosList = createSelector(
    [selectUserTodosState],
    (todosState: TodoListSchema) =>
        todosAdapter.getSelectors().selectAll(todosState),
)

export const getTodoListIsLoading = createSelector(
    [selectUserTodosState],
    (todosState: TodoListSchema) => todosState.isLoading,
)
export const getTodoListCompleted = createSelector(
    [selectUserTodosState],
    (todosState: TodoListSchema) =>
        todosAdapter
            .getSelectors()
            .selectAll(todosState)
            .filter((todo) => todo.completed === true),
)
export const getTodoListActive = createSelector(
    [selectUserTodosState],
    (todosState: TodoListSchema) =>
        todosAdapter
            .getSelectors()
            .selectAll(todosState)
            .filter((todo) => todo.completed === false),
)
