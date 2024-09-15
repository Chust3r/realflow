'use client'
import { Card, CardContent } from '~ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '~ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { RoomConnection } from '~types'
import { useSocket } from '../socket-provider'
import { formatDate } from 'date-fns'

const config: ChartConfig = {
	connections: {
		label: 'Connections',
		color: 'hsl(var(--chart-4))',
	},
}

interface Props {
	data: RoomConnection[]
}

export function MetricsConnections({ data = [] }: Props) {
	const { currentConnections } = useSocket()

	return (
		<Card>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 dark:bg-accent/5'>
				<div className='flex flex-col gap-1 py-3'>
					<div className='flex items-center gap-1'>
						<h2 className='text-muted-foreground text-sm'>
							Real-Time Connections
						</h2>
					</div>
					<h3 className='text-xl font-medium'>
						{currentConnections || 0}
					</h3>
				</div>
				<ChartContainer
					className='aspect-auto h-[250px] w-full'
					config={config}
				>
					<BarChart accessibilityLayer data={data}>
						<Bar
							dataKey='connections'
							type='natural'
							fill='var(--color-connections)'
							stroke='var(--color-connections)'
							radius={5}
							opacity={0.8}
						/>
						<CartesianGrid vertical={false} strokeDasharray={'3 3'}/>
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) =>
								formatDate(new Date(value), 'MMM dd')
							}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickCount={3}
							allowDecimals={false}
							domain={[0, 20]}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										formatDate(new Date(value), 'MMMM dd')
									}
									indicator='dot'
								/>
							}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
