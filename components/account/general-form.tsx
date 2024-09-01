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
import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'
import { Input } from '~ui/input'
import { Button } from '~ui/button'
import { useForm } from 'react-hook-form'
import { object, string, InferInput } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { TriangleAlert } from 'lucide-react'
import { updateAccount } from '~actions/account'
import { useToast } from '~ui/use-toast'

const schema = object({
	username: string(),
	email: string(),
})

type FormValues = InferInput<typeof schema>

interface Props {
	defaultValues: FormValues
	image: string
}

export function GeneralForm({ defaultValues, image }: Props) {
	const form = useForm({
		resolver: valibotResolver(schema),
		defaultValues,
	})

	const { toast } = useToast()

	const {
		formState: { isSubmitting },
		reset,
		handleSubmit,
	} = form

	const handleFormSubmit = async (data: FormValues) => {
		const res = await updateAccount(data)

		if (res.status === 'success') {
			toast({
				title: 'Account updated',
				description: res.message || 'Your account has been updated.',
			})
		} else {
			toast({
				title: 'Account update failed',
				description: res.message || 'Your account could not be updated.',
			})
		}
	}

	return (
		<Form {...form}>
			<form
				autoComplete='off'
				method='POST'
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className='px-6 py-4 grid'>
					<div className='flex justify-center py-2'>
						<Avatar className='w-24 h-24'>
							<AvatarImage src={image} />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
					</div>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className='grid grid-cols-12 gap-x-6 items-center'>
								<FormLabel className='col-span-4 text-sm'>
									Username
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
						name='email'
						render={({ field }) => (
							<FormItem className='grid grid-cols-12 gap-x-6 gap-y-2 items-center'>
								<FormLabel className='col-span-4 text-sm opacity-50'>
									Email
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled
										className='col-span-8 bg-accent/10'
									/>
								</FormControl>
								<FormDescription className='col-start-5 col-end-12 flex gap-2 items-center mt-2'>
									<TriangleAlert className='w-4 h-4 stroke-muted-foreground' />
									<small className='text-xs text-muted-foreground'>
										Email address is managed by your OAuth provider.
									</small>
								</FormDescription>
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
							defaultValues.username === form.getValues('username') ||
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
							defaultValues.username === form.getValues('username') ||
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
