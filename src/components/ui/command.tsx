import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import type * as React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn("bg-white text-neutral-950 flex h-full w-full flex-col overflow-hidden rounded-md", className)}
			{...props}
		/>
	)
}

const CommandDialog = ({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	...props
}: React.ComponentProps<typeof Dialog> & {
	title?: string
	description?: string
}) => {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className="overflow-hidden p-0">
				<Command className="[&_[cmdk-group-heading]]:text-neutral-500 **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

const CommandInput = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) => {
	return (
		<div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				data-slot="command-input"
				className={cn(
					"placeholder:text-neutral-500 flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}
			/>
		</div>
	)
}

const CommandList = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) => {
	return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)} {...props} />
}

const CommandEmpty = ({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
	return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
}

const CommandGroup = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) => {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"text-neutral-950 [&_[cmdk-group-heading]]:text-neutral-500 overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className
			)}
			{...props}
		/>
	)
}

const CommandSeparator = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) => {
	return <CommandPrimitive.Separator data-slot="command-separator" className={cn("bg-neutral-200 -mx-1 h-px", className)} {...props} />
}

const CommandItem = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) => {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"data-[selected=true]:bg-neutral-100 data-[selected=true]:text-neutral-900 [&_svg:not([class*='text-'])]:text-neutral-500 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

const CommandShortcut = ({ className, ...props }: React.ComponentProps<"span">) => {
	return <span data-slot="command-shortcut" className={cn("text-neutral-500 ml-auto text-xs tracking-widest", className)} {...props} />
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
