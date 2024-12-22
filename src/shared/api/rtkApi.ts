import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { USER_TOKEN_KEY } from '../const/localstorage'

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
            if (token) {
                headers.set('Authorization', token)
            }
        },
    }),
    endpoints: (builder) => ({}),
})
