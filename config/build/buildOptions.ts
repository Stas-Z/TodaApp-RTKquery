import { BuildEnvironmentOptions } from 'vite'

import { BuildOptions } from './types/config'

export function buildOptions(options: BuildOptions): BuildEnvironmentOptions {
    const { paths, isDev } = options
    return {
        outDir: paths.build,
        sourcemap: isDev ? 'inline' : false,
        rollupOptions: {
            input: [paths.entry, paths.html],
            treeshake: true,
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
                manualChunks(id) {
                    if (/node_modules\/(react|react-dom)/.test(id)) {
                        return 'react'
                    }
                    if (id.includes('node_modules/@ant-design')) {
                        return 'antdesign'
                    }
                    if (id.includes('node_modules/antd')) {
                        return 'antd'
                    }
                    if (id.includes('node_modules/@reduxjs')) {
                        return 'redux'
                    }
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('/src/pages/')) {
                        const [, pageName] = id.split('/src/pages/')
                        return pageName.split('/')[0]
                    }
                },
            },
        },
    }
}
