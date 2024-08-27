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
import { RoomRequest } from '~types'
import { formatDate } from 'date-fns'

const config: ChartConfig = {
	authorized: {
		label: 'Authorized',
		color: '#171717',
	},
	unauthorized: {
		label: 'Unauthorized',
		color: '#262626',
	},
}

interface Props {
	data: RoomRequest[]
	total: number
}

export function MetricsRequests({ data = [], total = 0 }: Props) {
	return (
		<Card>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 bg-accent/5'>
				<div className='flex flex-col gap-1 py-3'>
					<div className='flex items-center gap-1'>
						<h2 className='text-muted-foreground text-sm'>
							Request Handling Overview
						</h2>
					</div>
					<h3 className='text-xl font-medium'>{total}</h3>
				</div>
				<ChartContainer
					className='aspect-auto h-[250px] w-full'
					config={config}
				>
					<BarChart accessibilityLayer data={data}>
						<Bar
							dataKey='authorized'
							fill='var(--color-authorized)'
							stroke='var(--color-authorized)'
							radius={5}
							opacity={0.8}
						/>
						<Bar
							dataKey='unauthorized'
							fill='var(--color-unauthorized)'
							stroke='var(--color-unauthorized)'
							radius={5}
							opacity={0.8}
						/>
						<CartesianGrid vertical={false} />
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
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										formatDate(new Date(value), 'MMM dd')
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
