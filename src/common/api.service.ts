import axios from "axios"
import { API_URL } from "@/common/config"
import { getToken } from "@/common/jwt.service";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL
    },
    setAuthHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`
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

