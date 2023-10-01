import { useTheme } from '../../providers/theme-provider'
import { getExtremes } from '../../utils/chart'
import { ResponsiveLine, Serie } from '@nivo/line'


interface ChartProps {
    serie: Serie
    tunnelLowerLimit: number
    tunnelUpperLimit: number
}


export default function Chart({ serie, tunnelLowerLimit, tunnelUpperLimit }: ChartProps) {
    const { lowerBound, upperBound } = getExtremes(serie, tunnelLowerLimit, tunnelUpperLimit)
    const { isThemeDark } = useTheme()

    const data = [
        {
            id: 'Compra',
            data: serie.data.map(point => ({ ...point, y: tunnelLowerLimit }))
        },
        serie,
        {
            id: 'Venda',
            data: serie.data.map(point => ({ ...point, y: tunnelUpperLimit })),
            pointWidth: 0
        }
    ]

    return (
        <ResponsiveLine
            colors={isThemeDark
                ? ['hsl(0, 40%, 50%)', 'hsl(200, 40%, 50%)', 'hsl(148, 40%, 50%)']
                : ['hsl(357, 42%, 58%)', 'hsl(200, 50%, 40%)', 'hsl(148, 40%, 50%)']
            }
            data={data}
            theme={{
                axis: {
                    ticks: {
                        text: {
                            fill: isThemeDark ? 'hsl(232, 10%, 80%)' : 'hsl(232, 29%, 10%)'
                        }
                    },
                },
                grid: {
                    line: {
                        stroke: isThemeDark ? 'hsl(232, 20%, 15%)' : 'hsl(240, 5.9%, 85%)'
                    }
                },
                tooltip: {
                    container: {
                        backgroundColor: isThemeDark ? 'hsl(232, 20%, 9%)' : 'hsl(0, 0%, 100%)',
                        borderColor: isThemeDark ? 'hsl(232, 20%, 15%)' : 'hsl(240, 5.9%, 85%)',
                        borderWidth: 1,
                        color: isThemeDark ? 'hsl(232, 10%, 80%)' : 'hsl(232, 29%, 10%)',

                    }
                },
                crosshair: {
                    line: {
                        stroke: isThemeDark ? 'hsl(232, 10%, 80%)' : 'hsl(232, 29%, 10%)',
                        strokeWidth: isThemeDark ? 0.5 : 1
                    }
                }
            }}
            margin={{ top: 10, right: 15, bottom: 25, left: 50 }}
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
            lineWidth={isThemeDark ? 2 : 2.5}
            pointColor={{ from: 'color', modifiers: [] }}
            pointLabelYOffset={-12}
            enableArea={false}
            pointSize={6}
            areaBaselineValue={lowerBound}
            areaOpacity={0.13}
            enableSlices='x'
            useMesh={true}
        />
    )
}