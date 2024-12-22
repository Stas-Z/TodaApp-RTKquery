import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { todoReducer } from '@/entities/Todo'
import { userReducer } from '@/entities/User'
import { authMiddleware, regReducer } from '@/features/AuthorizationForm'
import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'

import { StateSchema, ThunkExtraArg } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        authForm: regReducer,
        todo: todoReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            })
                .concat(rtkApi.middleware)
                .concat(authMiddleware),
    })

    return store
}
