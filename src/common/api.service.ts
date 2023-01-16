import axios from "axios"
import { API_URL } from "@/common/config"
import type {
  Bike,
  ExcursionFull,
  ExcursionPayload,
  ExcursionSimple,
  FullPath,
  Profile,
  SimplePath
} from "@/common/types";

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
      return res.data.map(dateFromBackend("departure")).map(dateFromBackend("arrival"))
    },
    // GET /excursions/{id}
    async get(id: number): Promise<ExcursionFull> {
      const res = await axios.get(`/excursions/${id}`)
      return dateFromBackend("departure")(dateFromBackend("arrival")(res.data))
    },
    // DELETE /excursions/{id}
    async delete(id: number): Promise<number> {
      const res = await axios.delete(`/excursions/${id}`)
      return res.data
    },
    // PUT /excursions/{id}
    async update(id: number, excursion: ExcursionPayload): Promise<ExcursionSimple> {
      let payload = dateToBackend("departure")(excursion)
      const res = await axios.put(`/excursions/${id}`, payload)
      return dateFromBackend("departure")(dateFromBackend("arrival")(res.data))
    },
    // POST /excursions
    async create(excursion: ExcursionPayload): Promise<ExcursionSimple> {
      let payload = dateToBackend("departure")(excursion)
      const res = await axios.post(`/excursions`, payload)
      return dateFromBackend("departure")(dateFromBackend("arrival")(res.data))
    }
  },
  bikes: {
    // GET /bikes/{userId}
    async getAll(id: number): Promise<Bike[]> {
      const res = await axios.get(`/bikes/${id}`)
      return res.data.map(dateFromBackend("purchaseDate"))
    }
  },
  profile: {
    // GET /profile
    async get(): Promise<Profile> {
      const res = await axios.get(`/profile`)
      return res.data
    }
  },
  paths: {
    // GET /paths/mine
    async getMine(): Promise<SimplePath[]> {
      const res = await axios.get(`/paths/mine`)
      return res.data
    },
    // GET /paths/all
    async getAll(): Promise<SimplePath[]> {
      const res = await axios.get(`/paths/all`)
      return res.data
    },
    // GET /paths/{pathId}
    async getFullPath(pathId: number): Promise<FullPath> {
      const res = await axios.get(`/paths/${pathId}`)
      return res.data
    }
  }
}

function dateFromBackend(field: string) {
  return function(data: any): any {
    if (data[field] == null) {
      return data
    }
    data[field] = new Date(data[field])
    return data
  }
}

function dateToBackend(field: string) {
  return function(data: any): any {
    if (data[field] == null) {
      return data
    }
    data[field] = data[field].toISOString().replace('T', ' ').split('.')[0]
    return data
  }
}

export default ApiService

