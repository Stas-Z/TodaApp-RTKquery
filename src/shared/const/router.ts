export enum AppRoutes {
    LOGIN = 'login',
    TODO = 'todo',
    COMPLETED = 'completed',
    FORBIDDEN = 'forbidden',

    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => '/'
export const getRouteTodo = () => '/todo'
export const getRouteTodoCompleted = () => '/completed'
export const getRouteForbidden = () => '/forbidden'
