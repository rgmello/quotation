import getAxios from '../utils/axios'
import { useEffect, useState } from 'react'
import { Asset, CycleQuery, QueryData } from '../utils/types'


export function useQueryData(asset?: Asset | null, query?: CycleQuery) {
    const [queryData, setQueryData] = useState<QueryData>()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const axios = getAxios()

    useEffect(() => {
        setIsLoading(true)
        const today = new Date()
        const initialQuery = { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() }

        async function fetchData(query: CycleQuery) {
            if (!asset) return
            try {
                setError(null)
                const response = await axios.get<number[]>(`/assets/${asset.id}/cycle_prices/?year=${query.year}&month=${query.month}&day=${query.day}`)
                !ignore && setQueryData({ query: query, values: response.data })
            } catch (error) {
                setError('Essa consulta é inválida.')
                console.error('Erro ao consultar histórico do ativo:', error)
            }
            setIsLoading(false)
        }

        let ignore = false
        fetchData(query || initialQuery)

        return () => { ignore = true }
    }, [asset, query])

    return {
        queryData: queryData,
        isLoading: isLoading,
        error: error
    }
}