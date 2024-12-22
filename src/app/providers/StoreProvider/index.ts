import type {
    StateSchema,
    ThunkConfig,
    AppDispatch,
    ThunkExtraArg,
} from './config/StateSchema'
import { StoreProvider } from './ui/StoreProvider'

export { StoreProvider }

export type { StateSchema, AppDispatch, ThunkConfig, ThunkExtraArg }
