import Card from '../primitives/card'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import QueryForm from '../forms/query-form'
import { CycleQuery, QueryData } from '../../utils/types'
import { useAssetContext } from '../../providers/asset-provider'
import { useQueryData } from '../../hooks/cycle-query-hook'


interface QueryCardProps {
    setQueryData: (queryData: QueryData) => void
    className?: string
}


export default function QueryCard({ setQueryData, className }: QueryCardProps) {
    const { asset } = useAssetContext()
    const [query, setQuery] = useState<CycleQuery>()
    const { queryData, isLoading: isDataLoading, error } = useQueryData(asset, query)

    useEffect(() => {
        queryData && setQueryData(queryData)
    }, [queryData, setQueryData])

    return (
        <Card className={twMerge('justify-center gap-0', className)}>
            <h3 className='text-md font-bold'>Consultar Histórico</h3>
            <span className={`text-smaller mb-4 ${error ? 'text-destructive' : 'text-card-foreground/80'}`}>
                {error || 'Informe apenas os campos relevantes.'}
            </span>
            <QueryForm onSubmit={setQuery} isLoading={isDataLoading} />
        </Card>
    ) 
}