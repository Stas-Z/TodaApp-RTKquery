import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption } from 'vite'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

export function buildPlugins(): PluginOption[] {
    const plugins = [
        react(),
        tsconfigPaths({
            projects: [path.resolve(__dirname, '..', '..', 'tsconfig.json')],
        }),
        visualizer(),
        checker({
            typescript: true,
        }),
    ]
    return plugins
}
