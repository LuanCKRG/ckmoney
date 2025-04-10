import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransactions } from "@/contexts/transactions-context"
import { zodResolver } from "@hookform/resolvers/zod"
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
							<FormControl>
								<Input
									placeholder="Categoria"
									className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
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
