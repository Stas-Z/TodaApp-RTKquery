import { memo } from 'react'

import { Menu, MenuProps } from 'antd'
import { Link } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Logo } from '@/shared/ui/Logo'

import { useSidebarItems } from '../../model/selectors/getSidebarItems'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props

    const sidebarItemsList = useSidebarItems()

    type MenuItem = Required<MenuProps>['items'][number]
    const sidebarItems: MenuItem[] = sidebarItemsList.map((item) => ({
        key: item.id,
        icon: <item.Icon />,
        label: <Link to={item.path}>{item.text}</Link>,
    }))

    return (
        <div className={classNames('', {}, [className])}>
            <Logo />
            <Menu
                mode="inline"
                theme="dark"
                items={sidebarItems}
                defaultSelectedKeys={['1']}
            />
        </div>
    )
})
