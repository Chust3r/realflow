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
import { RoomRequest } from '~types'
import { Radio } from 'lucide-react'

const config: ChartConfig = {
	authorized: {
		label: 'Authorized',
		color: '#262626',
	},
	unauthorized: {
		label: 'Unauthorized',
		color: '#404040',
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
					<AreaChart accessibilityLayer data={data}>
						<defs>
							<linearGradient
								id='fillAuthorized'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-authorized)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-authorized)'
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id='fillUnauthorized'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-unauthorized)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-unauthorized)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey='authorized'
							type='natural'
							fill='url(#fillAuthorized)'
							stroke='var(--color-authorized)'
							radius={5}
						/>
						<Area
							dataKey='unauthorized'
							type='natural'
							fill='url(#fillUnauthorized)'
							stroke='var(--color-unauthorized)'
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
