export interface ExcursionSimple {
    id: number
    bikeId: number
    departure: Date
    arrival: Date | null

    pathName: string
}

export interface ExcursionFull {
    id: number
    bikeId: number
    departure: Date
    arrival: Date | null

    path: FullPath
}

export interface ExcursionPayload {
    userId: number
    bikeId: number
    pathId: number
    departure: Date
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

export interface NewPath {
    name: string
    creatorId: number
    steps: number[]
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
    purchaseDate: Date
    brand: string
    cassette: string
    wheels: string
}

export interface Profile {
    id: number
    username: string
}

export interface User {
    id: 3,
    username: string,
    lastname: string,
    firstname: string,
    birthdate: string,
    size: number,
    weight: number,
    purchases: Bike[],
}