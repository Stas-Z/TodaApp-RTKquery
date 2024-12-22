import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import { PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

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
