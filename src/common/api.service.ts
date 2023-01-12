import axios from "axios"
import { API_URL } from "@/common/config"

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL
    },
    setAuthHeader(token: string) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    },
    removeAuthHeader() {
        axios.defaults.headers.common["Authorization"] = ""
    },
    auth: {
        login(username: string, password: string) {
            return axios.post("/login", {
                'username': username,
                'password': password,
            })
        },
        register(username: string, password: string) {
            return axios.post("/register", {
                'username': username,
                'password': password,
            })
        },
    },
    sorties: {
        async getAll() {
            const res = await axios.get("/excursions")
            return res.data
        }
    }
}

export default ApiService

