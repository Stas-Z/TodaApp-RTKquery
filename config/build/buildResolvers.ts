import { AliasOptions, ResolveOptions } from 'vite'

import { BuildOptions } from './types/config'

export function buildResolvers(options: BuildOptions): ResolveOptions & {
    alias?: AliasOptions
} {
    return {
        alias: [{ find: '@', replacement: options.paths.src }],
        extensions: ['.tsx', '.ts', '.js'],
    }
}
