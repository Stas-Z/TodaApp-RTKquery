import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { MyTodo } from '@/entities/Todo'

import { fetchTodoList } from '../services/fetchTodoList/fetchTodoList'
import { TodoListSchema } from '../types/todoListSchema'

export const todosAdapter = createEntityAdapter<MyTodo, string>({
    selectId: (todo: MyTodo) => todo._id,
})

export const todoListSlice = createSlice({
    name: 'todoListSlice',
    initialState: todosAdapter.getInitialState<TodoListSchema>({
        search: '',
        isLoading: false,
        error: '',
        ids: [],
        entities: {},
    }),
    reducers: {
        setTodo: todosAdapter.setOne,
        updateTodo: todosAdapter.updateOne,
        deleteTodo: todosAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoList.pending, (state, action) => {
                state.isLoading = true
                state.error = ''
                if (action.meta.arg.replace) {
                    todosAdapter.removeAll(state)
                }
            })
            .addCase(fetchTodoList.fulfilled, (state, action) => {
                state.isLoading = false
                todosAdapter.setAll(state, action.payload)
            })
            .addCase(fetchTodoList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: todoListActions } = todoListSlice
export const { reducer: todoListReducer } = todoListSlice
