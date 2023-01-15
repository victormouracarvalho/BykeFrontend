import type { Store } from "vuex";

export interface State {
    token: string | null
    error: string | null
}

export interface LoginPayload {
    username: string
    password: string
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
