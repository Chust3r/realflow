'use client'
import { Card, CardContent } from '~ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '~ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts'
import { RoomOrigin } from '~types'

const config: ChartConfig = {
	authorized: {
		label: 'Authorized',
		color: 'hsl(var(--chart-4))',
	},
	unauthorized: {
		label: 'Unauthorized',
		color: 'hsl(var(--chart-5))',
	},
	label: {
		color: 'hsl(var(--foreground))',
	},
}

interface Props {
	data: RoomOrigin[]
	total: number
}

export const description = 'Chart with request source overview'

export function MetricsOrigin({ data = [], total = 0 }: Props) {
	return (
		<Card>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 dark:bg-accent/5'>
				<div className='flex flex-col gap-1 py-3'>
					<div className='flex items-center gap-1'>
						<h2 className='text-muted-foreground text-sm'>
							Request Source Overview
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
						<CartesianGrid vertical={false} strokeDasharray={'3 3'} />
						<XAxis
							dataKey='origin'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis
							dataKey='total'
							type='number'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							allowDecimals={false}
						/>
						<Bar
							dataKey='authorized'
							fill='var(--color-authorized)'
							radius={5}
							opacity={0.8}
						></Bar>
						<Bar
							dataKey='unauthorized'
							fill='var(--color-unauthorized)'
							radius={5}
							opacity={0.8}
						></Bar>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' />}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
