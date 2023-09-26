import { Serie } from '@nivo/line'
import { Asset, Price } from './types'

export function getChartDataFromPrices(prices: Price[], asset: Asset): Serie[] {
    const transformedData: Serie[] = [{
        id: asset.code,
        data: [],
    }]

    const minuteMap = new Map<string, { timestamp: string; price: number }>()

    for (const price of prices) {
        const timestamp: string = price.timestamp
        const priceValue: number = price.price

        // Converte o timestamp em minutos
        const timestampDate = new Date(timestamp)
        const hour = timestampDate.getHours()
        const minutes = timestampDate.getMinutes()
        const minuteKey = `${hour}:${minutes < 10 ? '0'+minutes : minutes}`

        // Verifica se já existe um ponto para este minuto
        const existingMinutePoint = minuteMap.get(minuteKey)

        // Se não existir ou se este preço é mais recente, atualize o mapa
        if (!existingMinutePoint || new Date(timestamp) > new Date(existingMinutePoint.timestamp)) {
            minuteMap.set(minuteKey, { timestamp, price: priceValue })
        }
    }

    // Agora crie as séries a partir do mapa
    for (const [minuteKey, { price }] of Array.from(minuteMap.entries()).reverse())
        transformedData[0].data.push({ x: minuteKey, y: price })

    return transformedData
}

export function getExtremes(data: Serie[], min: number, max: number) {
    const points = data[0].data

    for (var point of points) {
        const y = Number(point.y)
        min = y < min ? y : min
        max = y > max ? y : max
    }

    return { lowerBound: min, upperBound: max}
}