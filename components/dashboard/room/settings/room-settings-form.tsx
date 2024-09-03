'use client'
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
import { Button } from '~ui/button'
import { useForm } from 'react-hook-form'
import { object, string, InferInput, pipe, optional, minLength } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { updateRoom } from '~actions/room'
import { toast } from 'sonner'

const schema = object({
	id: string(),
	name: pipe(
		string(),
		minLength(4, 'Name must be at least 4 characters long')
	),
	description: optional(string()),
})

type FormValues = InferInput<typeof schema>

interface Props {
	defaultValues: FormValues
}

export function RoomSettingsForm({ defaultValues }: Props) {
	const form = useForm({
		resolver: valibotResolver(schema),
		defaultValues,
	})

	const {
		formState: { isSubmitting },
		reset,
		handleSubmit,
	} = form

	const handleFormSubmit = async (data: FormValues) => {
		const { ok, title, message } = await updateRoom(data)

		if(ok) toast.success(title, {
			description: message,
		})

		if(!ok) toast.error(title, {
			description: message,
		})

	}

	return (
		<Form {...form}>
			<form
				autoComplete='off'
				method='POST'
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className='px-6 py-4 grid'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='grid grid-cols-12 gap-x-6 items-center'>
								<FormLabel className='col-span-4 text-sm text-foreground'>
									Room Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='col-span-8 bg-accent/10'
									/>
								</FormControl>
								<FormDescription />
								<FormMessage className='col-start-5 col-end-12 text-muted-foreground text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='grid grid-cols-12 gap-x-6 items-center'>
								<FormLabel className='col-span-4 text-sm text-foreground'>
									Room Description
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='col-span-8 bg-accent/10'
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='id'
						render={({ field }) => (
							<FormItem className='grid grid-cols-12 gap-x-6 gap-y-2 items-center'>
								<FormLabel className='col-span-4 text-sm opacity-50'>
									Room ID
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled
										className='col-span-8 bg-accent/10'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex h-14 border-t justify-end items-center px-6 gap-2'>
					<Button
						variant='ghost'
						size='xs'
						disabled={
							(defaultValues.name === form.getValues('name') &&
								defaultValues.description ===
									form.getValues('description')) ||
							isSubmitting
						}
						onClick={() => reset()}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						size='xs'
						disabled={
							(defaultValues.name === form.getValues('name') &&
								defaultValues.description ===
									form.getValues('description')) ||
							isSubmitting
						}
					>
						Save
					</Button>
				</div>
			</form>
		</Form>
	)
}
