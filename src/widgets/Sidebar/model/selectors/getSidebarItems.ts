import {
    CheckCircleOutlined,
    PauseCircleOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import {
    getRouteLogin,
    getRouteTodo,
    getRouteTodoCompleted,
} from '@/shared/const/router'

import { SidebarItemType } from '../types/sidebar'

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData)
    const sidebarItemsList: SidebarItemType[] = [
        {
            id: '1',
            path: getRouteLogin(),
            Icon: UserOutlined,
            text: 'Авторизация',
        },
    ]
    if (userData) {
        sidebarItemsList.push(
            {
                id: '1',
                path: getRouteTodo(),
                Icon: CheckCircleOutlined,
                text: 'Все задания',
                authOnly: true,
            },
            {
                id: '2',
                path: getRouteTodoCompleted(),
                Icon: PauseCircleOutlined,
                text: 'Завершенные',
                authOnly: true,
            },
        )
        sidebarItemsList.shift()
    }

    return sidebarItemsList
}
