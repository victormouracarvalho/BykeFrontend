import type { ActionContext } from "vuex";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

type State = {
    token: string | null
    error: string | null
}

type LoginPayload = {
    username: string
    password: string
}

const Auth = {
    state(): State {
        return {
            token: JwtService.getToken(),
            error: null,
        }
    },
    getters: {
        isAuthenticated(state: State) {
            return state.token != null
        }
    },
    mutations: {
        setToken(state: State, token: string) {
            state.token = token
        },
        clearToken(state: State) {
            state.token = null
        },
        setError(state: State, error: string) {
            state.error = error
        },
        clearError(state: State) {
            state.error = null
        },
    },
    actions: {
        async login({commit}: ActionContext<State, any>, {username, password}: LoginPayload) {
            try {
                commit('clearError')
                const response = await ApiService.auth.login(username, password)
                commit('setToken', response.data.token)
                JwtService.saveToken(response.data.token)
                ApiService.setAuthHeader(response.data.token)
            } catch (err: any) {
                // TODO https://axios-http.com/docs/handling_errors
                commit('setError', err.message)
                throw {
                    ...err,
                    stack: null, // do not spam console
                }
            }
        },
        async logout({commit}: ActionContext<State, any>) {
            commit('clearToken')
            JwtService.destroyToken()
            ApiService.removeAuthHeader()
        },
        async register({commit}: ActionContext<State, any>, {username, password}: LoginPayload) {
            try {
                commit('clearError')
                const response = await ApiService.auth.register(username, password)
                commit('setToken', response.data.token)
                JwtService.saveToken(response.data.token)
                ApiService.setAuthHeader(response.data.token)
            } catch (err: any) {
                // TODO https://axios-http.com/docs/handling_errors
                commit('setError', err.message)
                throw {
                    ...err,
                    stack: null, // do not spam console
                }
            }
        },
    },
}

export default Auth
