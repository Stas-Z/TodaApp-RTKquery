import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserData = (state: StateSchema) => state.user

export const getUserAuthData = createSelector(
    getUserData,
    (user) => user.isAuth,
)

export const getCurrentUser = createSelector(
    getUserData,
    (user) => user.currentUser,
)
