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
