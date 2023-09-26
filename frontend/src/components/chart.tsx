import { ResponsiveLine, Serie } from '@nivo/line'
import { getExtremes } from '../utils/chart'

interface ChartProps {
    data: Serie[],
    tunnelLowerLimit: number,
    tunnelUpperLimit: number
}

export default function AssetPriceChart({ data, tunnelLowerLimit, tunnelUpperLimit }: ChartProps) {
    const { lowerBound, upperBound } = getExtremes(data, tunnelLowerLimit, tunnelUpperLimit)

    return (
        <ResponsiveLine
            data={data}
            colors={'hsl(100, 40%, 40%)'}
            margin={{ top: 10, right: 20, bottom: 40, left: 50 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: lowerBound,
                max: upperBound,
                stacked: false
            }}
            yFormat='.2f'
            crosshairType='cross'
            curve='monotoneX'
            axisBottom={{
                tickSize: 5,
                tickPadding: 7,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 14,
                tickRotation: 0,
                format: '.2f',
                legend: '',
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={true}
            lineWidth={2}
            pointSize={7}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={lowerBound}
            areaOpacity={0.2}
            enableSlices='x'
            useMesh={true}
        />
    )
}