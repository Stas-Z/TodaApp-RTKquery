import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { todoReducer } from '@/entities/Todo'
import { userReducer } from '@/entities/User'
import { authMiddleware, regReducer } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        authForm: regReducer,
        todo: todoReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(rtkApi.middleware)
                .concat(authMiddleware),
    })

    return store
}
