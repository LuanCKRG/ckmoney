import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
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
		value: z.coerce.number().gt(0, "Valor deve ser maior que 0"),
		type: z.enum(["income", "outcome"]),
		category: z.string().refine((val) => categories.includes(val), { message: "Categoria inválida ou não cadastrada" }),
		note: z.string().optional()
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

	function formatCurrency(value: number) {
		// Garante que o valor seja tratado como centavos
		const cents = Math.round(value * 100)
		const integerPart = Math.floor(cents / 100)
		const decimalPart = cents % 100

		// Formata parte inteira com separadores de milhar
		const formattedInteger = new Intl.NumberFormat("pt-BR", {
			style: "decimal",
			maximumFractionDigits: 0
		}).format(integerPart)

		// Garante dois dígitos nos centavos
		const formattedDecimal = decimalPart.toString().padStart(2, "0")

		return `R$ ${formattedInteger},${formattedDecimal}`
	}

	function parseCurrency(formattedValue: string) {
		// Remove todos os não dígitos e converte para número
		const rawValue = formattedValue.replace(/\D/g, "")

		// Converte para centavos e divide por 100
		const value = Number.parseInt(rawValue.padEnd(3, "0"), 10) / 100

		return Number.isNaN(value) ? 0 : value
	}

	function handleCreateNewCategory() {
		addCategory(categorySearch.trim())
		setValue("category", categorySearch.trim())
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
									value={formatCurrency(field.value || 0)}
									onChange={(e) => {
										const numericValue = parseCurrency(e.target.value)
										field.onChange(numericValue)
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-2">
					<Button
						onClick={() => handleTransactionType("income")}
						className={cn("h-16 rounded-sm gap-x-4", {
							"bg-[#E4EEEB] border-green-500 hover:border-green-600": type === "income",
							"border-neutral-300 hover:border-[#BEBEBE] bg-transparent": type === "outcome"
						})}
						type="button"
					>
						<img className="size-5" src={incomeImg} alt="Entrada" />
						<span className="text-base text-title">Entrada</span>
					</Button>

					<Button
						onClick={() => handleTransactionType("outcome")}
						className={cn("h-16 rounded-sm gap-x-4", {
							"border-neutral-300 hover:border-[#BEBEBE] bg-transparent": type === "income",
							"bg-[#F6DEE4] border-red-500 hover:border-red-600": type === "outcome"
						})}
						type="button"
					>
						<img className="size-5" src={outcomeImg} alt="Saída" />
						<span className="text-base text-title">Saída</span>
					</Button>
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
													Criar <span className="rounded-sm underline">{categorySearch}</span>
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

							<FormMessage className="mx-auto" />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="note"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Observação"
									className="resize-none
									w-full px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base
								"
									{...field}
								/>
							</FormControl>
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
