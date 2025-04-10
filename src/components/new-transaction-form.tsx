import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTransactions } from "@/contexts/transactions-context"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const NewTransactionForm = () => {
	const { addTransaction, categories, addCategory } = useTransactions()
	const [categorySearch, setCategorySearch] = useState<string>("")

	const newTransactionSchema = z.object({
		title: z.string().min(1, "Título é obrigatório"),
		value: z.coerce.number().min(0, "Valor deve ser maior que 0"),
		type: z.enum(["income", "outcome"]),
		category: z.string().refine(
			(val) => categories.includes(val), // Valida se a categoria está na lista
			{ message: "Categoria inválida" }
		)
	})

	type NewTransactionData = z.infer<typeof newTransactionSchema>

	const newTransactionForm = useForm<z.infer<typeof newTransactionSchema>>({
		resolver: zodResolver(newTransactionSchema),
		defaultValues: {
			title: "",
			value: 0,
			type: "income",
			category: ""
		}
	})

	const { setValue, watch, control, handleSubmit, reset } = newTransactionForm
	const type = watch("type")

	function handleCreateNewCategory() {
		addCategory(categorySearch)
		setValue("category", categorySearch)
	}

	function handleTransactionType(newType: "income" | "outcome") {
		setValue("type", newType)
	}

	function onSubmit(data: NewTransactionData) {
		addTransaction({ ...data, date: new Date() })
		reset()
	}

	return (
		<Form {...newTransactionForm}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Título"
									className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="value"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Valor"
									className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-2">
					<button
						onClick={() => handleTransactionType("income")}
						className={`h-16 border rounded-sm flex justify-center items-center space-x-4 transition-colors
      ${type === "income" ? "bg-[#E4EEEB] border-green-500 hover:border-green-600" : "border-neutral-300 hover:border-[#BEBEBE] bg-transparent"}`}
						type="button"
					>
						<img className="size-5" src={incomeImg} alt="Entrada" />
						<span className="text-base text-title">Entrada</span>
					</button>

					<button
						onClick={() => handleTransactionType("outcome")}
						className={`h-16 border rounded-sm flex justify-center items-center space-x-4 transition-colors
      ${type === "outcome" ? "bg-[#F6DEE4] border-red-500 hover:border-red-600" : "border-neutral-300 hover:border-[#BEBEBE] bg-transparent"}`}
						type="button"
					>
						<img className="size-5" src={outcomeImg} alt="Saída" />
						<span className="text-base text-title">Saída</span>
					</button>
				</div>

				<FormField
					control={control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												"w-[250px] mx-auto justify-between h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? categories.find((category) => category === field.value) : "Selecione a categoria"}
											<ChevronsUpDown className="opacity-50 stroke-3 size-5" />
										</Button>
									</FormControl>
								</PopoverTrigger>

								<PopoverContent className="w-[250px] p-0">
									<Command>
										<CommandInput value={categorySearch} onValueChange={setCategorySearch} placeholder="Procurar categoria..." className="h-9" />

										<CommandList>
											<CommandEmpty className="p-3 text-left">
												<button
													onClick={() => handleCreateNewCategory()}
													type="button"
													className="p-2 bg-gray-300 hover:bg-gray-200 transition-colors duration-200 w-full rounded-sm"
												>
													Criar <span className="py-1 px-3 bg-violet-500 text-white rounded-sm">{categorySearch}</span>
												</button>
											</CommandEmpty>

											<CommandGroup>
												{categories.map((category) => (
													<CommandItem
														value={category}
														key={category}
														onSelect={() => {
															setValue("category", category)
														}}
														className="hover:cursor-pointer hover:brightness-90"
													>
														{category}
														<Check className={cn("ml-auto", category === field.value ? "opacity-100" : "opacity-0")} />
													</CommandItem>
												))}
												<p className="text-xs text-body indent-3 py-1 ">Selecione uma categoria ou crie uma</p>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-full h-16 font-semibold bg-primary-green text-white rounded-sm px-6 hover:brightness-90" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	)
}
