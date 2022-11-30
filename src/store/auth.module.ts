import type { ActionContext } from "vuex";
import ApiService from "@/common/api.service";
import jwtService from "@/common/jwt.service";

type State = {
    token: string | null
}

type LoginPayload = {
    username: string
    password: string
}

const Auth = {
    state(): State {
        return {
            token: null
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
        }
    },
    actions: {
        async login({ commit }: ActionContext<State, any>, { username, password}: LoginPayload ) {
            try {
                const response = await ApiService.auth.login(username, password)
                commit('setToken', response.data.token)
                jwtService.saveToken(response.data.token)
            } catch(err: any) {
                // TODO https://axios-http.com/docs/handling_errors
                console.error(err.message)
                return false
            }
        }
    },
}

export default Auth
