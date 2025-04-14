import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import totalImg from "@/assets/total.svg"
import { useTransactions } from "@/contexts/transactions-context"
import { useMemo } from "react"

export const Summary = () => {
	const { transactions } = useTransactions()

	const { total, income, outcome } = useMemo(() => {
		return transactions.reduce(
			(acc, transaction) => {
				if (transaction.type === "income") {
					acc.income += transaction.value
					acc.total += transaction.value
				} else {
					acc.outcome += transaction.value
					acc.total -= transaction.value
				}
				return acc
			},
			{ total: 0, income: 0, outcome: 0 }
		)
	}, [transactions])

	const cards = [
		{
			title: "Entradas",
			image: incomeImg,
			value: income
		},
		{
			title: "Saídas",
			image: outcomeImg,
			value: outcome
		},
		{
			title: "Total",
			image: totalImg,
			value: total
		}
	]

	return (
		<div className="-mt-30 flex flex-col md:grid md:grid-cols-3 gap-5">
			{cards.map((card) => (
				<div key={card.title} className="bg-shape px-6 py-3 rounded-sm text-title shadow-lg">
					<header className="flex items-center justify-between">
						<p>{card.title}</p>
						<img src={card.image} alt={card.title} />
					</header>

					<strong className="mt-4 text-3xl font-medium leading-12">
						{Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL"
						}).format(card.value)}
					</strong>
				</div>
			))}
		</div>
	)
}
