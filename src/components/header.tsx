import incomeImg from "@/assets/income.svg"
import logo from "@/assets/logo.svg"
import outcomeImg from "@/assets/outcome.svg"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { useTransactions } from "@/contexts/transactions-context"
import { useState } from "react"

type FormData = {
	title: string
	value: string
	type: "income" | "outcome"
	category: string
}

export const Header = () => {
	const [open, setOpen] = useState(false)
	const { addTransaction } = useTransactions()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset
	} = useForm<FormData>({
		defaultValues: {
			type: "income"
		}
	})

	const selectedType = watch("type")

	const onSubmit = (data: FormData) => {
		const newTransaction = {
			...data,
			value: Number(data.value),
			date: new Date().toISOString()
		}
		addTransaction(newTransaction)
		reset()
		setOpen(false)
	}

	return (
		<header className="bg-dark-purple">
			<div className="flex justify-between w-full max-w-6xl pt-8 pb-36 px-4 mx-auto">
				<img src={logo} alt="CK Money" />

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<button type="button" className="h-12 px-8 text-base rounded-sm bg-light-purple text-shape hover:brightness-90 duration-200">
							Nova transação
						</button>
					</DialogTrigger>
					<DialogContent className="bg-background max-w-xl p-4 rounded-sm">
						<DialogHeader>
							<DialogTitle className="text-title text-2xl mb-8">Cadastrar transação</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<input
								{...register("title", { required: "Título é obrigatório" })}
								type="text"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Título"
							/>
							{errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

							<input
								{...register("value", {
									required: "Valor é obrigatório",
									pattern: {
										value: /^[0-9]*\.?[0-9]+$/,
										message: "Valor inválido"
									}
								})}
								type="number"
								step="0.01"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Valor"
							/>
							{errors.value && <span className="text-red-500 text-sm">{errors.value.message}</span>}

							<div className="grid grid-cols-2 gap-2">
								<button
									type="button"
									onClick={() => setValue("type", "income")}
									className={`h-16 border rounded-sm flex justify-center items-center space-x-4 ${
										selectedType === "income" ? "bg-green-100 border-green-500" : "border-neutral-300 bg-transparent"
									}`}
								>
									<img className="size-5" src={incomeImg} alt="Entrada" />
									<span className="text-base text-title">Entrada</span>
								</button>

								<button
									type="button"
									onClick={() => setValue("type", "outcome")}
									className={`h-16 border rounded-sm flex justify-center items-center space-x-4 ${
										selectedType === "outcome" ? "bg-red-100 border-red-500" : "border-neutral-300 bg-transparent"
									}`}
								>
									<img className="size-5" src={outcomeImg} alt="Saída" />
									<span className="text-base text-title">Saída</span>
								</button>
							</div>

							<input
								{...register("category", { required: "Categoria é obrigatória" })}
								type="text"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Categoria"
							/>
							{errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}

							<button type="submit" className="w-full h-12 bg-green-500 text-shape rounded-sm hover:brightness-90 duration-200">
								Cadastrar
							</button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</header>
	)
}
