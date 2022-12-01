import axios from "axios"
import { API_URL } from "@/common/config"

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL
    },
    setAuthHeader(token: string) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
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

