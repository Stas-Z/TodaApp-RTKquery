import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthType } from '../consts/authConsts'
import { AuthSchema } from '../types/AuthSchema'

export const initialState: AuthSchema = {
    password: '',
    email: '',
    view: AuthType.AUTH,
}

export const regSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setView: (state, action: PayloadAction<AuthType>) => {
            state.view = action.payload
        },
    },
})

export const { actions: regActions } = regSlice
export const { reducer: regReducer } = regSlice
