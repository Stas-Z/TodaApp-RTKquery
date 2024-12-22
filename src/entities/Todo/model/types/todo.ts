export interface MyTodo {
    _id: string
    value?: string
    userId?: string
    createdAt?: string
    completed?: boolean
}

export interface MyTodoSchema {
    value: string
}
