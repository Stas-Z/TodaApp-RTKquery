import { User, userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

interface AuthByEmailProps {
    email: string
    password: string
}

const userAuthApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        authByEmail: build.mutation<User, AuthByEmailProps>({
            query: (authData) => ({
                url: 'user/login',
                method: 'POST',
                body: authData,
            }),
            onQueryStarted: async (_, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled
                    dispatch(userActions.setUser(data))
                    if (data.token) {
                        localStorage.setItem(USER_TOKEN_KEY, data.token)
                    }
                } catch (err) {
                    console.error(err)
                    localStorage.removeItem(USER_TOKEN_KEY)
                }
            },
        }),
        regByEmail: build.mutation<{ message: string }, AuthByEmailProps>({
            query: (authData) => ({
                url: 'user/registration',
                method: 'POST',
                body: authData,
            }),
        }),
    }),
})

export const useAuthByMail = userAuthApi.useAuthByEmailMutation
export const useRegByMail = userAuthApi.useRegByEmailMutation
