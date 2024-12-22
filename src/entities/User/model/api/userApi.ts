import { rtkApi } from '@/shared/api/rtkApi'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

import { userActions } from '../slices/userSlice'
import { User } from '../types/userSchema'

export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        initAuthData: build.query<User, void>({
            query: () => ({
                url: 'user/auth',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        USER_TOKEN_KEY,
                    )}`,
                },
            }),

            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const data = await queryFulfilled
                    dispatch(userActions.setUser(data.data))
                } catch (err) {
                    console.error(err)
                    localStorage.removeItem(USER_TOKEN_KEY)
                }
            },
        }),
    }),
})

export const useInitAuthData = userApi.useInitAuthDataQuery
