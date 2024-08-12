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
import { object, string, optional, boolean, InferInput } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { ConfirmDialog } from './confirmDialog'
import { useChannelStore, setChannelStore } from '~/stores/channel'

//→ FORM SCHEMA

const formSchema = object({
	name: string(),
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

export function CreateChannel() {
	const form = useForm<FormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	})

	const {
		formState: { isDirty },
		reset,
	} = form

	const { open } = useChannelStore()

	//→ SHEET HANDLERS

	const handleSheetOpenChange = (value: boolean) => {
		if (!isDirty && !value) {
			setChannelStore({ open: false })
		}

		if (!!isDirty && !value) {
			setChannelStore({ confirmOpen: true })
		}
	}

	return (
		<Sheet open={open} onOpenChange={handleSheetOpenChange}>
			<ConfirmDialog reset={reset} />
			<SheetContent className='p-0 w-[600px] sm:max-w-[600px] flex flex-col'>
				<div className='border-b px-6 flex items-center h-14'>
					<SheetTitle className='text-foreground font-medium tracking-tight'>
						Create a new channel
					</SheetTitle>
				</div>
				<ScrollArea className='flex-1 flex-grow'>
					<Form {...form}>
						<form className='flex flex-col ' autoComplete='off'>
							<div className='border-b px-6 py-7 space-y-10'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center'>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm'>
													Name
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription></FormDescription>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center'>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm'>
													Description
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Optional'
														{...field}
													/>
												</FormControl>
												<FormDescription></FormDescription>
												<FormMessage />
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
											<div className='flex items-start gap-3'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<p>Authentication</p>
													<span className='text-muted-foreground/60 text-xs'>
														Enable channel-level authentication,
														allowing users to secure their
														channels with tokens or keys. This
														ensures that only authorized users can
														connect and interact with the channel.
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
											<div className='flex items-start gap-3'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<p>Message Persistence</p>
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
											<div className='flex items-start gap-3'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className='min-w-[200px] text-muted-foreground text-sm cursor-pointer'>
													<p>Webhook Integration</p>
													<span className='text-muted-foreground/60 text-xs'>
														Enable webhook support so users can
														integrate their channels with other
														services. When certain events occur in
														the channel, a webhook can trigger
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
						<Button size='xs' variant='secondary'>
							Save
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
