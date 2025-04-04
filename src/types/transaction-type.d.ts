export interface TransactionProps {
	id: number
	value: number
	title: string
	type: "income" | "outcome"
	date: string
	category: string
}
