import { MyTodoSchema } from '@/entities/Todo'
import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { createReduxStore } from './store'

export interface StateSchema {
    user: UserSchema
    authForm: AuthSchema
    todo: MyTodoSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type RootState = ReturnType<typeof createReduxStore>['getState']
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
