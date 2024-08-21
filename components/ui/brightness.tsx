import { cn } from '~lib/utils'

interface Props {
	className?: string
	classNameBrightness?: string
	children?: React.ReactNode
}

export function Brightness({
	className,
	classNameBrightness,
	children,
}: Props) {
	return (
		<div
			className={cn(
				'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold relative',
				className
			)}
		>
			<span>{children}</span>
			<span
				className={cn(
					'w-full h-full blur absolute inset-0',
					classNameBrightness
				)}
			></span>
		</div>
	)
}
