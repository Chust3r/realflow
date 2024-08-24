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
import { ScrollArea, ScrollBar } from '~ui/scroll-area'
import { useForm, useFieldArray } from 'react-hook-form'
import {
	object,
	string,
	optional,
	date,
	InferInput,
	array,
	regex,
	pipe,
	minLength,
	maxLength,
} from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { ConfirmDialog } from './confirm-dialog'
import { useSecretStore, setSecretStore } from '~stores/secret'
import { Plus, Trash } from 'lucide-react'
import { createSecretKey } from '~actions/api-keys'
import { useToast } from '~ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '~ui/popover'
import { Calendar } from '~ui/calendar'
import { format } from 'date-fns'
import { cn } from '~lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Fragment } from 'react'


//→ FORM SCHEMA

const formSchema = object({
	value: string(),
	description: pipe(
		string(),
		minLength(5, 'Description must be at least 5 characters'),
		maxLength(50)
	),
	expires: optional(date()),
	ipAddresses: array(
		object({
			ipAddress: pipe(
				string(),
				regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Invalid IP address')
			),
		})
	),
})

type FormValues = InferInput<typeof formSchema>

const defaultValues: FormValues = {
	value: 'sk_random_secret_key()',
	description: '',
	expires: undefined,
	ipAddresses: [],
}

export function CreateSecretKeys() {
	const form = useForm<FormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	})

	const {
		formState: { isDirty },
		reset,
	} = form

	const { append, fields, remove } = useFieldArray({
		control: form.control,
		name: 'ipAddresses',
	})

	const { open } = useSecretStore()

	const { toast } = useToast()

	const { roomId } = useSecretStore()

	const handleAddIP = () => {
		append({ ipAddress: '' })
	}

	const handleRemoveIP = (i: number) => {
		remove(i)
	}

	//→ SHEET HANDLERS

	const handleSheetOpenChange = (value: boolean) => {
		if (!isDirty && !value) {
			setSecretStore({ open: false })
		}

		if (!!isDirty && !value) {
			setSecretStore({ confirmOpen: true })
		}

		reset()
	}
	const handleSubmit = async (values: FormValues) => {
		const res = await createSecretKey({
			roomId,
			adresses: values.ipAddresses.map((ip) => ip.ipAddress),
			description: values.description,
			expires: values.expires
				? format(new Date(values.expires), 'yyyy-MM-dd HH:mm:ss.SSS')
				: undefined,
		})

		if (res.status === 'success') {
			toast({
				title: 'Room created',
				description: res.message || 'Your room has been created',
			})
		} else {
			toast({
				title: 'Room creation failed',
				description: res.message || 'Your room could not be created',
			})
		}
		setSecretStore({ open: false })
		reset()
	}

	return (
		<Sheet open={open} onOpenChange={handleSheetOpenChange}>
			<ConfirmDialog reset={reset} />
			<SheetContent className='p-0 w-[600px] sm:max-w-[600px] flex flex-col'>
				<div className='border-b px-6 flex items-center h-14'>
					<SheetTitle className='text-foreground font-medium tracking-tight'>
						Create a new Secret Key
					</SheetTitle>
				</div>
				<ScrollArea className='flex-1 flex-grow'>
					<Form {...form}>
						<form
							className='flex flex-col '
							autoComplete='off'
							onSubmit={form.handleSubmit(handleSubmit)}
						>
							<div className='border-b px-6 py-7 space-y-7'>
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
														placeholder='Describe your secret key'
													/>
												</FormControl>

												<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='value'
									render={({ field }) => (
										<FormItem>
											<div className='grid grid-cols-12 items-center gap-x-2 gap-y-1'>
												<FormLabel className='col-span-4 text-muted-foreground text-sm'>
													Secret Key
												</FormLabel>
												<FormControl className='col-span-8'>
													<Input
														{...field}
														disabled
														className='bg-accent/10'
													/>
												</FormControl>

												<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='expires'
									render={({ field }) => (
										<FormItem>
											<div className='grid grid-cols-12 items-center gap-x-2 gap-y-1'>
												<FormLabel className='col-span-4 text-muted-foreground text-sm'>
													Date of Expiration
												</FormLabel>
												<Popover>
													<PopoverTrigger
														asChild
														className='col-span-8'
													>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value &&
																		'text-muted-foreground'
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent
														className='w-auto p-0'
														align='start'
													>
														<Calendar
															mode='single'
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date < new Date()
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<FormDescription className='col-span-12 text-muted-foreground text-xs mt-2'>
													This field indicates the date when the
													secret key becomes invalid. It enhances
													security by ensuring that the key is only
													usable within a specific timeframe,
													helping to prevent unauthorized access
													and reducing the risk of key compromise.
												</FormDescription>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className='px-6 py-7 space-y-10'>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center justify-between'>
										<p className='text-foreground text-sm font-medium'>
											IP Address Restrictions
										</p>
										<Button
											variant='ghost'
											size='xs'
											type='button'
											onClick={handleAddIP}
										>
											<Plus className='w-4 h-4 opacity-50 mr-2' />
											Add IP Address
										</Button>
									</div>
									<span className='text-xs text-muted-foreground'>
										List the IP addresses that are blocked from
										accessing this resource. Any IP address in this
										list will be denied access.
									</span>
								</div>
								<div className='flex flex-col gap-3'>
									{fields.map((field, i) => (
										<Fragment key={field.id}>
											<FormField
												{...form.register(
													`ipAddresses.${i}.ipAddress`
												)}
												key={field.id}
												control={form.control}
												render={({ field }) => (
													<FormItem className=''>
														<FormControl>
															<div className='flex items-center gap-2'>
																<Input
																	{...field}
																	placeholder='244.178.44.111'
																/>
																<Button
																	size='icon'
																	variant='ghost'
																	onClick={() =>
																		handleRemoveIP(i)
																	}
																>
																	<Trash className='w-4 h-4 stroke-muted-foreground' />
																</Button>
															</div>
														</FormControl>
														<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
													</FormItem>
												)}
											/>
										</Fragment>
									))}
								</div>
							</div>
						</form>
					</Form>
					<ScrollBar orientation='vertical' />
				</ScrollArea>

				<SheetFooter>
					<div className='border-t w-full h-14 flex justify-end px-3 items-center gap-3'>
						<Button
							variant='ghost'
							size='xs'
							onClick={() => handleSheetOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							size='xs'
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
