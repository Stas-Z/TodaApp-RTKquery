import { Dispatch, isAnyOf } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'
import { userActions } from '@/entities/User'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

interface Store {
    dispatch: Dispatch
    getState: () => StateSchema
}
const isLoggedOut = isAnyOf(userActions.logout)

export const authMiddleware =
    (store: Store) =>
    (next: (action: unknown) => unknown) =>
    (action: unknown): void => {
        if (isLoggedOut(action)) {
            localStorage.removeItem(USER_TOKEN_KEY)
        }

        next(action)
    }
