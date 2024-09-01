'use client'
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
    PolarAngleAxis,
	RadialBar,
	RadialBarChart,
} from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~ui/card'
import { ChartConfig, ChartContainer } from '~ui/chart'

export const description = 'A radial chart showing the number of rooms created'

interface Props {
	rooms: number
	max:number
}
const chartConfig = {
	count: {
		label: 'Rooms Created',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export function RoomsIndicator({ rooms,max }: Props) {
	const chartData = [
		{
			category: 'rooms',
			count: rooms,
			fill: 'var(--color-count)',
		},
	]

	return (
		<Card className='flex flex-col bg-accent/10'>
			<CardHeader className='items-center pb-0'>
				<CardTitle className='text-sm'>Rooms Created</CardTitle>
				<CardDescription className='text-xs text-center'>
					You can create up to 3 rooms
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='aspect-square w-full h-28'
				>
					<RadialBarChart
						data={chartData}
						startAngle={90}
						endAngle={450}
						innerRadius={40}
						outerRadius={60}
					>
                        <PolarAngleAxis type='number' domain={[0,max]} angleAxisId={0} tick={false}/>
						<RadialBar dataKey='count' background cornerRadius={10} angleAxisId={0}/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-xl font-bold'
												>
													{rooms}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 20}
													className='fill-muted-foreground'
												>
													Rooms
												</tspan>
											</text>
										)
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none text-muted-foreground text-xs text-center'>
					You're using {rooms} out of {max} rooms available
				</div>
			</CardFooter>
		</Card>
	)
}
