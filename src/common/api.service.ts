import axios from "axios"
import { API_URL } from "@/common/config"
import type { ExcursionFull, ExcursionPayload, ExcursionSimple, Profile, Bike } from "@/common/types";

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
    },
    excursions: {
        // GET /excursions
        async getAll(): Promise<ExcursionSimple[]> {
            const res = await axios.get("/excursions")
            return res.data
        },
        // GET /excursions/{id}
        async get(id: number): Promise<ExcursionFull> {
            const res = await axios.get(`/excursions/${id}`)
            return res.data
        },
        // DELETE /excursions/{id}
        async delete(id: number): Promise<ExcursionFull>{
            const res = await axios.delete(`/excursions/${id}`)
            return res.data
        },
        // PUT /excursions/{id}
        async update(id: number, excursion: ExcursionPayload): Promise<ExcursionSimple>{
            const res = await axios.put(`/excursions/${id}`, excursion)
            return res.data
        },
        // POST /excursions
        async create( excursion: ExcursionPayload): Promise<ExcursionSimple>{
            const res = await axios.post(`/excursions`, excursion)
            return res.data
        }
    },
    bikes: {
        async getAll(id: number): Promise<Bike[]> {
            const res = await axios.get(`/bikes/${id}`)
            return res.data
        }
    },
    profile: {
        async get(): Promise<Profile> {
            const res = await axios.get(`/profile`)
            return res.data
        }
    }
}

export default ApiService

