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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { RoomConnection } from '~types'
import { useSocket } from '../socket-provider'
import { EthernetPort } from 'lucide-react'

const config: ChartConfig = {
	connections: {
		label: 'Connections',
		color: '#262626',
	},
}

interface Props {
	data: RoomConnection[]
}

export function MetricsConnections({ data = [] }: Props) {
	const { currentConnections } = useSocket()

	return (
		<Card>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 bg-accent/5'>
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
					<AreaChart accessibilityLayer data={data}>
						<defs>
							<linearGradient
								id='fillConnections'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-connections)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-connections)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey='connections'
							type='natural'
							fill='url(#fillConnections)'
							stroke='var(--color-connections)'
							radius={5}
						/>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value)

								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})
							}}
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
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString(
											'en-US',
											{
												month: 'short',
												day: 'numeric',
											}
										)
									}}
									indicator='dot'
								/>
							}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
