export interface ExcursionSimple {
    id: number
    bykeId: number
    departure: string
    arrival: string | null

    pathName: string
}

export interface ExcursionFull {
    id: number
    bykeId: number
    departure: string
    arrival: string | null

    path: FullPath
}

export interface ExcursionPayload {
    bykeId: number
    pathId: number
    departure: string
}

export interface SimplePath {
    id: number
    name: string
    creatorName: string
}

export interface FullPath {
    id: number
    name: string
    creator: Creator

    steps: Step[]
}

export interface Creator {
    id: number
    name: string
}

export interface Step {
    location: string
    latitude: string,
    longitude: string,
    id: number
}


export interface Bike {
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

export interface Profile {
    id: number
    username: string
}