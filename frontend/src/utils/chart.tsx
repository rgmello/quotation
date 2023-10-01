import { Price } from './types'
import { format } from 'date-fns'
import { Serie } from '@nivo/line'
import { monthName } from './date'


export function getQueryChartData(values: number[], identifier: string): Serie {
    const transformedData: Serie = {
        id: identifier,
        data: [],
    }

    values.forEach((value, index) => transformedData.data.push({ x: index + 1, y: value !== 0 ? value : undefined }))

    // Anual
    if (values.length === 12)
        transformedData.data = transformedData.data.map(point => (
            { x: monthName[Number(point.x)]?.slice(0, 3), y: point.y })
        )

    // Diário
    if (values.length === 24)
        transformedData.data = transformedData.data.slice(8, 18).map(point => (
            { x: point.x + 'h', y: point.y })
        )

    return transformedData
}


export function getRealTimeChartData(prices: Price[], identifier: string): Serie {
    const transformedData: Serie = {
        id: identifier,
        data: [],
    }

    const minuteMap = new Map<string, { timestamp: string; value: number }>()

    for (const price of prices) {
        const date = new Date(price.timestamp)
        const minuteKey = format(date, 'HH:mm')

        const existingPoint = minuteMap.get(minuteKey)
        if (!existingPoint || new Date(price.timestamp) > new Date(existingPoint.timestamp))
            minuteMap.set(minuteKey, { timestamp: price.timestamp, value: price.price })
    }

    for (const [minuteKey, { value }] of Array.from(minuteMap.entries()).slice(0, 10).reverse())
        transformedData.data.push({ x: minuteKey, y: value })

    return transformedData
}


export function getExtremes(serie: Serie, min: number, max: number) {
    const points = serie.data

    for (var point of points) {
        const y = Number(point.y)
        min = y < min ? y : min
        max = y > max ? y : max
    }

    const gap = max-min
    min -= gap/50

    return { lowerBound: min, upperBound: max }
}