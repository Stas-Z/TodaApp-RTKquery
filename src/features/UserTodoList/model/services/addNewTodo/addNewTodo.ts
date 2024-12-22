import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyTodo } from '@/entities/Todo'

import { fetchTodoList } from '../fetchTodoList/fetchTodoList'

export const addNewTodo = createAsyncThunk<MyTodo, string, ThunkConfig<string>>(
    'userTodolist/addNewTodo',
    async (value, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI

        if (!value) {
            return rejectWithValue('no data')
        }

        try {
            const response = await extra.api.post<MyTodo>('todos', {
                value,
            })

            if (!response.data) {
                throw new Error()
            }

            dispatch(fetchTodoList({}))

            return response.data
        } catch (e) {
            return rejectWithValue('error')
        }
    },
)
