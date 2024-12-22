export interface BuildPaths {
    entry: string
    build: string
    src: string
    html: string
}

export interface BuildOptions {
    mode: string
    paths: BuildPaths
    isDev: boolean
    port: number
    apiUrl: string
}
