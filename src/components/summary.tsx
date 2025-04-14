import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import totalImg from "@/assets/total.svg"

export const Summary = () => {
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
		<div className="-mt-30 flex flex-col md:grid md:grid-cols-3 gap-5">
			{cards.map((card) => (
				<div key={card.title} className="bg-shape px-6 py-3 rounded-sm text-title shadow-lg">
					<header className="flex items-center justify-between">
						<p>{card.title}</p>
						<img src={card.image} alt={card.title} />
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
	)
}
