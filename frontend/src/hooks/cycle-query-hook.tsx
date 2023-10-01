import { useEffect, useState } from 'react'
import { Asset, CycleQuery, QueryData } from '../utils/types'
import axios from 'axios'


export function useQueryData(asset?: Asset | null, query?: CycleQuery) {
    const [queryData, setQueryData] = useState<QueryData>()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const today = new Date()
        const initialQuery = { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() }

        async function fetchData(query: CycleQuery) {
            if (!asset) return
            try {
                setError(null)
                const response = await axios.get<number[]>(`/api/assets/${asset.id}/cycle_prices/?year=${query.year}&month=${query.month}&day=${query.day}`)
                setIsLoading(false)
                !ignore && setQueryData({ query: query, values: response.data })
            } catch (error) {

                setError('Essa consulta é inválida.')
                console.error('Erro ao consultar histórico do ativo:', error)
            }
        }

        let ignore = false
        fetchData(query || initialQuery)

        return () => { ignore = true }
    }, [asset, query, setQueryData])

    return {
        queryData: queryData,
        isLoading: isLoading,
        error: error
    }
}