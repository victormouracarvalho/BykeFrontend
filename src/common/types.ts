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