import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyTodo } from '@/entities/Todo'

interface FetchTodoListProps {
    replace?: boolean
    sort?: boolean
    search?: string
    completed?: boolean
}

export const fetchTodoList = createAsyncThunk<
    MyTodo[],
    FetchTodoListProps,
    ThunkConfig<string>
>('userTodolist/fetchTodoList', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const { search, sort, completed } = props

    try {
        const response = await extra.api.get<MyTodo[]>('todos', {
            params: {
                sort,
                search,
                completed,
            },
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
