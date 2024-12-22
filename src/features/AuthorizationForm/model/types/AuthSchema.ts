import { AuthType } from '../consts/authConsts'

export interface AuthSchema {
    email: string
    password: string
    view: AuthType
}
