'use client'
import { Card, CardContent } from '~ui/card'
import {
	ChartConfig,
	ChartContainer,
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
						layout='vertical'
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid vertical={false} strokeDasharray={'3 3'}/>
						<YAxis
							dataKey='address'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis
							dataKey='total'
							type='number'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							allowDecimals={false}
						/>
						<Bar
							dataKey='authorized'
							layout='vertical'
							fill='var(--color-authorized)'
							radius={4}
							stackId='a'
							opacity={0.8}
						></Bar>
						<Bar
							dataKey='unauthorized'
							layout='vertical'
							fill='var(--color-unauthorized)'
							stackId='a'
							radius={[0, 4, 4, 0]}
							opacity={0.5}
						></Bar>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent indicator='line' cursor={false} />
							}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
