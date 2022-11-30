import axios from "axios"
import { API_URL } from "@/common/config"
import { useStore } from "vuex";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL
    },
    async setAuthHeader() {
        const store = useStore()
        if (!store.getters.isAuthenticated) {
            throw new Error("User is not authenticated")
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`
    },
    auth: {
      login(username: string, password: string) {
           return axios.post("/login", {
              'pseudoUtil': username,
              'mdpUtil': password,
          })
      }
    },
}

export default ApiService

