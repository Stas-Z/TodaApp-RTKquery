import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { initialState } from '../../slice/regSlice'

export const getLoginState = (state: StateSchema) =>
    state?.authForm || initialState

export const getPassword = createSelector(
    getLoginState,
    (authForm) => authForm.password,
)

export const getAuthView = createSelector(
    getLoginState,
    (authForm) => authForm.view,
)

export const getEmail = createSelector(
    getLoginState,
    (authForm) => authForm.email,
)
