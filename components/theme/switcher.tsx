'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~ui/select'
import { useTheme } from 'next-themes'
import { Moon,Shapes, TvMinimal } from 'lucide-react'

interface Props {
	className?: string
}

export function ThemeSwitcher({ className }: Props) {
	const { setTheme, theme } = useTheme()

	const handleThemeOnChange = (value: string) => {
		setTheme(value)
	}

	return (
		<Select
			onValueChange={handleThemeOnChange}
			defaultValue={theme || 'system'}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder='Theme' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='system'>
					<div className='flex items-center gap-3'>
						<TvMinimal className='h-5 w-5 stroke-muted-foreground' />
						<span>System</span>
					</div>
				</SelectItem>
				<SelectItem value='dark'>
					<div className='flex items-center gap-3'>
						<Moon className='h-5 w-5 stroke-muted-foreground' />
						<span>Dark</span>
					</div>
				</SelectItem>
				<SelectItem value='light'>
					<div className='flex items-center gap-3'>
						<Shapes className='h-5 w-5 stroke-muted-foreground' />
						<span>Clasic</span>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
