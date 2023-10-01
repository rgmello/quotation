import { Asset } from './types'

export function getRecommendation(asset: Asset, price: number) {
    if (price < asset.tunnel_lower_limit) return 'buy'
    if (price > asset.tunnel_upper_limit) return 'sell'
    return ''
}