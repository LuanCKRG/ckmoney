import { Header } from "@/components/header"

import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import totalImg from "@/assets/total.svg"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TransactionProps {
	id: number
	value: number
	title: string
	type: "income" | "outcome"
	date: string // No formato DD/MM/YYYY
	category: string
}

export const App = () => {
	const cards = [
		{
			title: "Entradas",
			image: incomeImg
		},
		{
			title: "Saídas",
			image: outcomeImg
		},
		{
			title: "Total",
			image: totalImg
		}
	]

	const transactions: TransactionProps[] = [
		{
			id: 1,
			value: 3500,
			title: "Salário",
			type: "income",
			date: "15/03/2024",
			category: "Trabalho"
		},
		{
			id: 2,
			value: 200,
			title: "Aluguel",
			type: "outcome",
			date: "10/03/2024",
			category: "Casa"
		},
		{
			id: 3,
			value: 1200,
			title: "Freelance",
			type: "income",
			date: "12/03/2024",
			category: "Trabalho"
		},
		{
			id: 4,
			value: 450,
			title: "Supermercado",
			type: "outcome",
			date: "14/03/2024",
			category: "Alimentação"
		},
		{
			id: 5,
			value: 800,
			title: "Venda Bike",
			type: "income",
			date: "08/03/2024",
			category: "Lazer"
		},
		{
			id: 6,
			value: 90,
			title: "Internet",
			type: "outcome",
			date: "05/03/2024",
			category: "Casa"
		},
		{
			id: 7,
			value: 75,
			title: "Cinema",
			type: "outcome",
			date: "17/03/2024",
			category: "Lazer"
		},
		{
			id: 8,
			value: 35,
			title: "Uber",
			type: "outcome",
			date: "13/03/2024",
			category: "Transporte"
		},
		{
			id: 9,
			value: 300,
			title: "Curso Online",
			type: "outcome",
			date: "01/03/2024",
			category: "Educação"
		},
		{
			id: 10,
			value: 15,
			title: "Cafeteria",
			type: "outcome",
			date: "19/03/2024",
			category: "Alimentação"
		}
	]

	return (
		<>
			<Header />

			<div className="mx-auto max-w-6xl py-10 px-4">
				<div className="-mt-30 flex flex-col md:grid md:grid-cols-3 gap-5">
					{cards.map((card) => (
						<div key={card.title} className="bg-shape px-6 py-3 rounded-sm text-title shadow-lg">
							<header className="flex items-center justify-between">
								<p>{card.title}</p>
								<img src={card.image} alt="Entradas" />
							</header>

							<strong className="mt-4 text-3xl font-medium leading-12">
								{" "}
								{Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(120)}{" "}
							</strong>
						</div>
					))}
				</div>

				<Table className="mt-16">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Título</TableHead>
							<TableHead>Valor</TableHead>
							<TableHead>category</TableHead>
							<TableHead>Data</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{transactions.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell className="font-medium">{transaction.title}</TableCell>
								<TableCell>{transaction.value}</TableCell>
								<TableCell>{transaction.date}</TableCell>
								<TableCell className="text-right">{transaction.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
