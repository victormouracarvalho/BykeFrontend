export interface Excursion {
    id: number
    bykeId: number
    start: string
    departure: string
    arrival: string
}

export interface ExcursionFull extends Excursion {
    path: Path
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
