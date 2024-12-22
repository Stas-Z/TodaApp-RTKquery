import { ServerOptions } from 'vite'

import { BuildOptions } from './types/config'

export function buildServer(options: BuildOptions): ServerOptions {
    return {
        port: options.port,
        open: true,
        hmr: true,
        host: true,
    }
}
