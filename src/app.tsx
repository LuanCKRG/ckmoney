import { Header } from "@/components/header"
import { TransactionsTable } from "@/components/transactions-table"

import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import totalImg from "@/assets/total.svg"

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

				<TransactionsTable className="mt-16" />
			</div>
		</>
	)
}
