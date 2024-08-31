'use client'
import { Router } from 'lucide-react'
import { useEventStore } from '~stores/events'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { CopyToClipboard } from '~ui/copy-to-clipboard'
import { ScrollArea, ScrollBar } from '~ui/scroll-area'

export function ViewEvent() {
	const { selectedEvent } = useEventStore()
	const [highlightedJson, setHighlightedJson] = useState('')
	const [dataToCopy, setDataToCopy] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const highlight = async () => {
			if (!selectedEvent) return

			setIsLoading(true)

			const template = {
				...selectedEvent,
				id: undefined,
			}

			setDataToCopy(JSON.stringify(template, null, 4))

			const code = await codeToHtml(JSON.stringify(template, null, 4), {
				lang: 'json',
				theme: 'none',
			})

			setHighlightedJson(code)
			setIsLoading(false)
		}

		highlight()
	}, [selectedEvent])

	return (
		<div className='w-full h-full p-3 bg-accent/5'>
			{!selectedEvent && (
				<div className='w-full h-full flex flex-col justify-center items-center gap-3 '>
					<Router className='size-7 stroke-muted-foreground' />
					<span className='text-muted-foreground text-sm font-medium text-center'>
						Select a event to view more information
					</span>
				</div>
			)}
			{selectedEvent && (
				<div className='text-muted-foreground relative h-full w-full'>
					{!isLoading ? (
						<>
							<CopyToClipboard
								className='absolute top-0 right-0 m-0.5 z-10'
								data={dataToCopy}
							/>
							<ScrollArea className='h-full w-full overflow-hidden'>
								<div
									dangerouslySetInnerHTML={{ __html: highlightedJson }}
								></div>
								<ScrollBar orientation='horizontal' />
							</ScrollArea>
						</>
					) : (
						<div className='w-full h-full grid place-content-center'>
							<span className='text-muted-foreground font-medium text-sm'>
								Loading event
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
