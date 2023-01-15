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

    path: Path
}

export interface ExcursionPayload {
    bykeId: number
    pathId: number
    departure: string
}

export interface Path {
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
