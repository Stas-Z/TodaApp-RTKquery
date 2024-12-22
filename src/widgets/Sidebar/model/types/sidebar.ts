import React from 'react'

import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

export interface SidebarItemType {
    id: string
    path: string
    text: string
    Icon: React.ComponentType<AntdIconProps>
    authOnly?: boolean
}
