import type { Store } from "vuex";

export interface State {
    token: string | null
    error: string | null
    userId: number | null
}

export interface LoginPayload {
    username: string
    password: string
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<{
            auth: State
        }>
    }
}
