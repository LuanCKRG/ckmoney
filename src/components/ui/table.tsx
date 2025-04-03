import type * as React from "react"

import { cn } from "@/lib/utils"

const Table = ({ className, ...props }: React.ComponentProps<"table">) => {
	return (
		<div data-slot="table-container" className="relative w-full overflow-x-auto">
			<table data-slot="table" className={cn("w-full caption-bottom text-sm border-separate border-spacing-y-2", className)} {...props} />
		</div>
	)
}

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
	return <thead data-slot="table-header" className={cn("", className)} {...props} />
}

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
	return <tbody data-slot="table-body" className={cn("", className)} {...props} />
}

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn("bg-neutral-100/50 border-t font-medium [&>tr]:last:border-b-0 dark:bg-neutral-800/50", className)}
			{...props}
		/>
	)
}

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
	return <tr data-slot="table-row" className={cn("hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100 transition-colors", className)} {...props} />
}

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-title h-10 px-2 text-center align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
	)
}

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"bg-shape text-body py-4 px-8 rounded-sm align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
	)
}

const TableCaption = ({ className, ...props }: React.ComponentProps<"caption">) => {
	return <caption data-slot="table-caption" className={cn("text-neutral-500 mt-4 text-sm dark:text-neutral-400", className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
