import { createSelector } from '@reduxjs/toolkit'

import { userTodoListApi } from '../api/userTodoListApi'

const selectUserTodosState = userTodoListApi.endpoints.getUserTodoList.select(
    {},
)

export const getTodosList = createSelector(
    selectUserTodosState,
    (todosResult) => todosResult?.data || [],
)

export const getTodoListCompleted = createSelector(getTodosList, (todos) =>
    todos.filter((todo) => todo.completed === true),
)
export const getTodoListActive = createSelector(getTodosList, (todos) =>
    todos.filter((todo) => todo.completed === false),
)
