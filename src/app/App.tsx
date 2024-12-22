import { memo } from 'react'

import { useInitAuthData } from '@/entities/User'
import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'

import AppRouter from './providers/router/ui/AppRouter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props

    useInitAuthData()

    return (
        <div id="app" className={classNames('', {}, [className])}>
            <ContentLayout
                header={<Navbar />}
                sidebar={<Sidebar />}
                content={<AppRouter />}
            />
        </div>
    )
})
