import { Asset } from './types'

export function getAssetLowerLimit(asset: Asset) {
    return asset.purchase_price * (1-asset.drop_percentage/100)
}

export function getAssetUpperLimit(asset: Asset) {
    return asset.purchase_price * (1+asset.increase_percentage/100)
}

export function getRecommendation(asset: Asset, price: number) {
    if (price <= getAssetLowerLimit(asset)) return 'buy'
    if (price >= getAssetUpperLimit(asset)) return 'sell'

    return ''
}