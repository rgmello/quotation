// Modelos

export interface Asset {
    id: number
    code: string
    name: string
    purchase_price: number
    drop_percentage: number
    increase_percentage: number
    check_interval_minutes: number
}

export interface Price {
    id: number
    asset: Asset
    price: number
    timestamp: string
}

// Informações paginadas da API

export interface AssetsListApiPage {
    results: Asset[],
    count: number,
    next: string | null,
    previous: string | null
}

export interface PricesListApiPage {
    results: Price[],
    count: number,
    next: string | null,
    previous: string | null
}

// Consulta de Período

export interface CycleQuery {
    day?: number,
    month?: number,
    year: number
}

export interface QueryData {
    query: CycleQuery
    values: number[]
}