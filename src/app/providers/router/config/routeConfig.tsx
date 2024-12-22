import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { TodoCompletedPage } from '@/pages/TodoCompletedPage'
import { TodoPage } from '@/pages/TodoPage'
import {
    AppRoutes,
    getRouteForbidden,
    getRouteLogin,
    getRouteTodo,
    getRouteTodoCompleted,
} from '@/shared/const/router'
import { AppRoutesProps } from '@/shared/types/router'

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.TODO]: {
        path: getRouteTodo(),
        element: <TodoPage />,
        authOnly: true,
    },
    [AppRoutes.COMPLETED]: {
        path: getRouteTodoCompleted(),
        element: <TodoCompletedPage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />, // последний
    },
}
