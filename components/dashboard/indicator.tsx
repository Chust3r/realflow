'use client'
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '~ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export function Indicator() {
	const pathname = usePathname()

	const items = pathname.split('/').slice(2)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => (
					<Fragment key={item}>
						<BreadcrumbItem>
							<BreadcrumbPage className='capitalize'>
								{item}
							</BreadcrumbPage>
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
