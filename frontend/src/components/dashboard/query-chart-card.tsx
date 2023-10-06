import Card from '../primitives/card'
import Chart from '../primitives/chart'
import { getQueryChartData } from '../../utils/chart'
import { CycleQuery, QueryData } from '../../utils/types'
import { useAssetContext } from '../../providers/asset-provider'
import { monthName } from '../../utils/date'
import { getAssetLowerLimit, getAssetUpperLimit } from '../../utils/analysis'


interface QueryChartCardProps {
    queryData?: QueryData
    className?: string
}


export default function QueryChartCard({ queryData, className }: QueryChartCardProps) {
    const { asset } = useAssetContext()

    function formatQuery(query: CycleQuery) {
        const {day, month, year} = query

        if (day && month)
            return `${day} de ${monthName[month]} de ${year}`
        if (month)
            return `${monthName[month]} de ${year}`
        return `${year}`
    }

    return (
        <Card className={className}>
            <h3 className='text-md font-bold'>
                {queryData ? formatQuery(queryData.query) : 'Carregando...'}
            </h3>
            <div className='h-full min-h-0 -ml-1'>
                {asset &&
                    <Chart
                        serie={getQueryChartData(queryData?.values || [], asset.code)}
                        tunnelLowerLimit={getAssetLowerLimit(asset)}
                        tunnelUpperLimit={getAssetUpperLimit(asset)}
                    />
                }
            </div>
        </Card>
    )
}