import { memo, useEffect } from 'react'

import { initAuthData } from '@/entities/User'
import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'

import AppRouter from './providers/router/ui/AppRouter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

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
