import { ReactNode } from 'react'

import { Layout } from 'antd'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ContentLayout.module.scss'
import { triggerStyles } from './triggerStyles'

interface ContentLayoutProps {
    className?: string
    content: ReactNode
    header: ReactNode
    sidebar: ReactNode
}

const { Header, Content, Sider } = Layout

export const ContentLayout = (props: ContentLayoutProps) => {
    const { className, content, sidebar, header } = props

    return (
        <Layout className={classNames(cls.contentLayout, {}, [className])}>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                className={cls.sidebar}
                zeroWidthTriggerStyle={triggerStyles}
            >
                {sidebar}
            </Sider>
            <Layout>
                <Header className={cls.header}>{header}</Header>
                <Content className={cls.content}>{content}</Content>
            </Layout>
        </Layout>
    )
}
