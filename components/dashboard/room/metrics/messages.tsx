'use client'
import { Card, CardContent } from '~ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '~ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { RoomMessage } from '~types'
import { formatDate } from 'date-fns'

const config: ChartConfig = {
	messages: {
		label: 'Messages',
		color: '#171717',
	},
	label: {
		color: 'hsl(var(--foreground))',
	},
}

interface Props {
	data: RoomMessage[]
	total: number
}

export function MetricsMessages({ data = [], total = 0 }: Props) {
	return (
		<Card>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 bg-accent/5'>
				<div className='flex flex-col gap-1 py-3'>
					<div className='flex items-center gap-1'>
						<h2 className='text-muted-foreground text-sm'>
							Stored Messages
						</h2>
					</div>
					<h3 className='text-xl font-medium'>{total}</h3>
				</div>
				<ChartContainer
					config={config}
					className='aspect-auto h-[250px] w-full'
				>
					<BarChart
						accessibilityLayer
						data={data}
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) =>
								formatDate(new Date(value), 'MMM d')
							}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickCount={3}
							allowDecimals={false}
						/>
						<Bar
							dataKey='messages'
							fill='var(--color-messages)'
							radius={4}
							opacity={0.8}
						></Bar>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										formatDate(new Date(value), 'MMM d')
									}
									indicator='dot'
								/>
							}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
