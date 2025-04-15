export interface TransactionProps {
	id: number
	value: number
	title: string
	type: "income" | "outcome"
	date: Date
	category: string
	note?: string
}
