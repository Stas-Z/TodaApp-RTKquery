export interface User {
    id: string
    email: string
    token?: string
}

export interface UserSchema {
    currentUser: User
    isAuth: boolean
}
