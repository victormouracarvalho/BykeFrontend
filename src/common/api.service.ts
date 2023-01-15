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
    },
    excursions: {
        // GET /excursions
        async getAll(): Promise<Excursion[]> {
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
        // PUT /excursions
        async update(id: number, excursion: ExcursionFull): Promise<ExcursionFull>{
            const res = await axios.put(`/excursions/${id}`, excursion)
            return res.data
        },
        async create( excursion: Excursion): Promise<Excursion>{
            const res = await axios.post(`/excursions`, excursion)
            return res.data
        }
    },
    bikes: {
        async getAll(id: number): Promise<Byke[]> {
            const res = await axios.get(`/bikes/${id}`)
            return res.data
        }
    }
}

interface Excursion {
    id: number
    bykeId: number
    start: string
    departure: string
    arrival: string
}

interface ExcursionFull extends Excursion {
    path: Path
}

interface Path {
    id: number
    creator: Creator
    steps: Step[]
}

interface Creator {
    id: number
    name: string
}

interface Step {
    location: string
    latitude: string,
    longitude: string,
    id: number
}
interface Byke {
    id: number
    owner: {
        id: number
        name: string
    }
    name: string
    purchaseDate: string
    brand: string
    cassette: string
    type: string
    wheels: string
}
export default ApiService

