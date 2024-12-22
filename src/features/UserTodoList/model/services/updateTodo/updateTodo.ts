import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyTodo } from '@/entities/Todo'

interface UpdateTodoProps {
    id?: string
    value?: string
    completed?: boolean
}

export const updateTodo = createAsyncThunk<
    MyTodo,
    UpdateTodoProps,
    ThunkConfig<string>
>('userTodoList/updateTodo', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const { id, value, completed } = props

    try {
        const response = await extra.api.post<MyTodo>('todos/update', {
            id,
            ...(value !== undefined && { value }),
            ...(completed !== undefined && { completed }),
        })

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
