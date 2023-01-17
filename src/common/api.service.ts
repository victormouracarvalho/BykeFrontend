import axios from "axios"
import { API_URL } from "@/common/config"
import type {
    ExcursionFull,
    ExcursionPayload,
    ExcursionSimple,
    FullPath,
    NewPath,
    SimplePath,
    Step,
    User
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
        // POST /login
        async login(username: string, password: string): Promise<{ token: string }> {
            const res = await axios.post("/login", {
                'username': username,
                'password': password,
            })
            return res.data
        },
        // POST /login/register
        async register(username: string, password: string) {
            return axios.post("/login/register", {
                'username': username,
                'password': password,
            })
        },
        // GET /login/user
        async user(): Promise<User> {
            const res = await axios.get("/login/user")
            res.data.purchases = res.data.purchases.map((bikeFromApi: any) => ({
                id: bikeFromApi.id.bikeId,
                purchaseDate: dateFromBackend(bikeFromApi.id.purchaseDate),
                brand: bikeFromApi.bike.brand,
                cassette: bikeFromApi.bike.cassette,
                wheels: bikeFromApi.bike.wheels,
            }))
            return res.data
        }
    },
    excursions: {
        // GET /excursions/user/{userId}
        async getAll(userId: number): Promise<ExcursionSimple[]> {
            const res = await axios.get("/excursions/user/" + userId)
            return res.data.map((excursionFromApi: any) => ({
                id: excursionFromApi.id2,
                bikeId: excursionFromApi.bike.id,
                departure: dateFromBackend(excursionFromApi.id.departure),
                arrival: dateFromBackend(excursionFromApi.arrival),
                pathName: excursionFromApi.path.name,
            }))
        },
        // GET /excursions/{id}
        async get(id: number): Promise<ExcursionFull> {
            const res = await axios.get(`/excursions/${id}`)
            return {
                id: res.data.id2,
                bikeId: res.data.bike.id,
                departure: dateFromBackendNotNull(res.data.id.departure),
                arrival: dateFromBackend(res.data.arrival),
                path: await ApiService.paths.getFullPath(res.data.path.id),
            }
        },
        // DELETE /excursions/{id}
        async delete(id: number) {
            await axios.delete(`/excursions/${id}`)
        },
        // PUT /excursions/{id}
        async update(id: number, payload: ExcursionPayload) {
            await axios.put(`/excursions/${id}`, {
                bikeId: payload.bikeId,
                pathId: payload.pathId,
                departure: dateToBackend(payload.departure),
            })
        },
        // POST /excursions
        async create(payload: ExcursionPayload) {
            await axios.post(`/excursions`, {
                userId: payload.userId,
                bikeId: payload.bikeId,
                pathId: payload.pathId,
                departure: dateToBackend(payload.departure),
            })
        }
    },
    paths: {
        // GET /paths
        async getUserPath(userId: number): Promise<SimplePath[]> {
            const res = await axios.get(`/paths`)
            return res.data.filter((pathFromApi: any) => {
                return pathFromApi.creator.id === userId
            }).map((pathFromApi: any) => ({
                id: pathFromApi.id,
                name: pathFromApi.name,
                creatorName: pathFromApi.creator.username,
            }))
        },
        // GET /paths/mostPopular
        async getAll(): Promise<SimplePath[]> {
            const res = await axios.get(`/paths/mostPopular`)
            return res.data.map((pathFromApi: any) => ({
                id: pathFromApi.id,
                name: pathFromApi.name,
                creatorName: pathFromApi.creator.username,
            }))
        },
        // GET /paths/{pathId}
        async getFullPath(pathId: number): Promise<FullPath> {
            const res = await axios.get(`/paths/${pathId}`)
            return {
                id: res.data.id,
                name: res.data.name,
                creator: {
                    id: res.data.creator.id,
                    username: res.data.creator.username,
                },
                steps: res.data.pathsteps.sort((a: any, b: any) => a.id.position - b.id.position).map((step: any) => ({
                    id: step.step.id,
                    location: step.step.location,
                    latitude: step.step.latitude,
                    longitude: step.step.longitude,
                })),
            }
        },
        // POST /paths/{pathId}
        async create(path: NewPath): Promise<number> {
            const res = await axios.post(`/paths`, {
                name: path.name,
                creatorId: path.creatorId,
            })
            return res.data.id
        },
        // PUT /paths/{pathId}/steps/add/{stepsIds}
        async initSteps(id: number, path: NewPath) {
            await axios.put(`/paths/${id}/steps/add/${path.steps.join(",")}`)
        }
    },
    steps: {
        // GET /steps
        async getAll(): Promise<Step[]> {
            const res = await axios.get(`/steps`)
            return res.data
        }
    },
}

function dateFromBackend(date: string): Date | null {
    if (date == "" || date == null) {
        return null
    }
    return new Date(date)
}

function dateFromBackendNotNull(date: string): Date {
    if (date == "" || date == null) {
        throw Error("Date is null")
    }
    return new Date(date)
}

function dateToBackend(date: Date): string {
    return date.toISOString().split('.')[0] + 'Z'
}

export default ApiService

