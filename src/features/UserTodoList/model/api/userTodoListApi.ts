import { MyTodo } from '@/entities/Todo'
import { rtkApi } from '@/shared/api/rtkApi'

interface FetchTodoListProps {
    sort?: boolean
    search?: string
    completed?: boolean
}

interface DeleteTodoProps {
    id: string
}

interface AddNewTodoProps {
    value: string
}

interface UpdateTodoProps {
    id?: string
    value?: string
    completed?: boolean
}

export const userTodoListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserTodoList: build.query<MyTodo[], FetchTodoListProps>({
            query: ({ sort, search, completed }) => ({
                url: '/todos',
                method: 'GET',
                params: {
                    sort,
                    search,
                    completed,
                },
            }),
        }),
        deleteUserTodo: build.mutation<void, DeleteTodoProps>({
            query: ({ id }) => ({
                url: `/todos/?id=${id}`,
                method: 'DELETE',
            }),
            onQueryStarted: async ({ id }, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                const patchResult = dispatch(
                    userTodoListApi.util.updateQueryData(
                        'getUserTodoList',
                        {},
                        (draft) => {
                            return draft.filter((todo) => todo._id !== id)
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    console.error('Error deleting todo:', error)
                    patchResult.undo()
                }
            },
        }),
        addNewTodo: build.mutation<MyTodo, AddNewTodoProps>({
            query: (value) => ({
                url: `/todos`,
                method: 'POST',
                body: value,
            }),
            onQueryStarted: async ({ value }, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    dispatch(
                        userTodoListApi.util.updateQueryData(
                            'getUserTodoList',
                            {},
                            (draft) => {
                                draft.unshift({
                                    _id: data._id,
                                    value,
                                    completed: false,
                                    createdAt: data.createdAt,
                                })
                            },
                        ),
                    )
                } catch (error) {
                    console.error('Error adding new todo:', error)
                }
            },
        }),
        updateUserTodo: build.mutation<MyTodo, UpdateTodoProps>({
            query: ({ id, value, completed }) => ({
                url: 'todos/update',
                method: 'POST',
                body: {
                    id,
                    ...(value !== undefined && { value }),
                    ...(completed !== undefined && { completed }),
                },
            }),
            onQueryStarted: async ({ id, value, completed }, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                const patchResult = dispatch(
                    userTodoListApi.util.updateQueryData(
                        'getUserTodoList',
                        {},
                        (draft) => {
                            const todo = draft.find((todo) => todo._id === id)
                            if (todo) {
                                if (value !== undefined) todo.value = value
                                if (completed !== undefined)
                                    todo.completed = completed
                            }
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    console.error('Error updating todo:', error)
                    patchResult.undo()
                }
            },
        }),
    }),
})

export const useGetUserTodoList = userTodoListApi.useGetUserTodoListQuery
export const useDeleteUserTodo = userTodoListApi.useDeleteUserTodoMutation
export const useAddNewUserTodo = userTodoListApi.useAddNewTodoMutation
export const useUpdateUserTodo = userTodoListApi.useUpdateUserTodoMutation
