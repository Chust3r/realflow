'use client'
import { Button } from '~ui/button'
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '~ui/sheet'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~ui/form'
import { Input } from '~ui/input'
import { Checkbox } from '~ui/checkbox'
import { ScrollArea, ScrollBar } from '~ui/scroll-area'
import { useForm } from 'react-hook-form'
import {
	object,
	string,
	optional,
	boolean,
	InferInput,
	minLength,
	pipe,
} from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { ConfirmDialog } from './confirmDialog'
import { useRoomStore, setRoomStore } from '~stores/room'
import { Webhook, Database, Lock } from 'lucide-react'
import { createRoom } from '~actions/room'

//→ FORM SCHEMA

const formSchema = object({
	name: pipe(
		string(),
		minLength(3, 'Name must be at least 3 characters long')
	),
	description: optional(string()),
	authentication: boolean(),
	messagePersistence: boolean(),
	webhook: boolean(),
})

type FormValues = InferInput<typeof formSchema>

const defaultValues: FormValues = {
	name: '',
	description: '',
	authentication: false,
	messagePersistence: false,
	webhook: false,
}

export function CreateRoom() {
	const form = useForm<FormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	})

	const {
		formState: { isDirty },
		reset,
	} = form

	const { open } = useRoomStore()

	//→ SHEET HANDLERS

	const handleSheetOpenChange = (value: boolean) => {
		if (!isDirty && !value) {
			setRoomStore({ open: false })
		}

		if (!!isDirty && !value) {
			setRoomStore({ confirmOpen: true })
		}

		reset()
	}

	const handleSubmit = async (values: FormValues) => {
		const { status } = await createRoom(values)

		//→ DO SOMETHING WITH STATUS

		setRoomStore({ open: false })
		reset()
	}

	return (
		<Sheet open={open} onOpenChange={handleSheetOpenChange}>
			<ConfirmDialog reset={reset} />
			<SheetContent className='p-0 w-[600px] sm:max-w-[600px] flex flex-col'>
				<div className='border-b px-6 flex items-center h-14'>
					<SheetTitle className='text-foreground font-medium tracking-tight'>
						Create a new room
					</SheetTitle>
				</div>
				<ScrollArea className='flex-1 flex-grow'>
					<Form {...form}>
						<form
							className='flex flex-col '
							autoComplete='off'
							onSubmit={form.handleSubmit(handleSubmit)}
						>
							<div className='border-b px-6 py-7 space-y-10'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<div className='grid grid-cols-12 items-center gap-x-2 gap-y-1'>
												<FormLabel className='col-span-4 text-muted-foreground text-sm'>
													Name
												</FormLabel>
												<FormControl className='col-span-8'>
													<Input {...field} />
												</FormControl>

												<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<div className='grid grid-cols-12 items-center gap-x-2 gap-y-1'>
												<FormLabel className='col-span-4 text-muted-foreground text-sm'>
													Description
												</FormLabel>
												<FormControl className='col-span-8'>
													<Input
														{...field}
														placeholder='Optional'
													/>
												</FormControl>

												<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className='px-6 py-7 space-y-10'>
								<FormField
									control={form.control}
									name='authentication'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center gap-5 h-full flex-row-reverse'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<div className='flex items-center gap-2'>
														<Lock className='w-4 h-4' />
														<p>Authentication</p>
													</div>
													<span className='text-muted-foreground/60 text-xs'>
														Enable room-level authentication,
														allowing users to secure their rooms
														with tokens or keys. This ensures that
														only authorized users can connect and
														interact with the room.
													</span>
												</FormLabel>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='messagePersistence'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center gap-5 h-full flex-row-reverse'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<div className='flex items-center gap-2'>
														<Database className='w-4 h-4' />
														<p>Message Persistence</p>
													</div>
													<span className='text-muted-foreground/60 text-xs'>
														Enable this setting to store all
														communications for future reference,
														or disable it for a more ephemeral
														experience.
													</span>
												</FormLabel>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='webhook'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center gap-5 h-full flex-row-reverse'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<div className='flex items-center gap-2'>
														<Webhook className='w-4 h-4' />
														<p>Webhook Integration</p>
													</div>
													<span className='text-muted-foreground/60 text-xs'>
														Enable webhook support so users can
														integrate their rooms with other
														services. When certain events occur in
														the Room, a webhook can trigger
														actions in external systems, allowing
														for more complex workflows and
														automation.
													</span>
												</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</form>
					</Form>
					<ScrollBar orientation='vertical' />
				</ScrollArea>

				<SheetFooter>
					<div className='border-t w-full h-14 flex justify-end px-3 items-center gap-3'>
						<Button
							variant='outline'
							size='xs'
							onClick={() => handleSheetOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							size='xs'
							variant='secondary'
							type='submit'
							onClick={() => form.handleSubmit(handleSubmit)()}
						>
							Save
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
