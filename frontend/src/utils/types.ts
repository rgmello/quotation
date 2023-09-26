export interface Asset {
    id: number
    code: string
    name: string
    tunnel_lower_limit: number
    tunnel_upper_limit: number
    check_interval_minutes: number
}

export interface Price {
    id: number
    asset: Asset
    price: number
    timestamp: string
}

export interface EmailNotification {
    id: number
    asset: Asset
    notification_type: string
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