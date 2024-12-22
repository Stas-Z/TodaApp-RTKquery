import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MyTodoSchema } from '../types/todo'

const initialState: MyTodoSchema = {
    value: '',
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

export const { actions: todoActions } = todoSlice
export const { reducer: todoReducer } = todoSlice
