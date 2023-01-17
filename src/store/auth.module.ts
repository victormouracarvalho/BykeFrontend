import type { ActionContext } from "vuex";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import type { LoginPayload, State } from "@/store/types";

const Auth = {
    state(): State {
        const token = JwtService.getToken()
        if (token != null) {
            ApiService.setAuthHeader(token)
        }
        const userId = JwtService.getUserId()
        return {
            token: token,
            error: null,
            userId: userId,
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
        setUserId(state: State, userId: number) {
            state.userId = userId
        },
        clearUserId(state: State) {
            state.userId = null
        }
    },
    actions: {
        async login({commit}: ActionContext<State, any>, {username, password}: LoginPayload) {
            try {
                commit('clearError')
                const { token } = await ApiService.auth.login(username, password)
                commit('setToken', token)
                JwtService.saveToken(token)
                ApiService.setAuthHeader(token)
                const user = await ApiService.auth.user()
                commit('setUserId', user.id)
                JwtService.saveUserId(user.id)
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
            commit('clearUserId')
            JwtService.destroyToken()
            JwtService.destroyUserId()
            ApiService.removeAuthHeader()
        },
        async register({commit}: ActionContext<State, any>, {username, password}: LoginPayload) {
            try {
                commit('clearError')
                await ApiService.auth.register(username, password)
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
