import { Header } from "@/components/header"
import { TransactionsTable } from "@/components/transactions-table"

import { TransactionsProvider } from "@/contexts/transactions-context"
import { Summary } from "./components/summary"

export const App = () => {
	return (
		<TransactionsProvider>
			<Header />

			<div className="mx-auto max-w-6xl py-10 px-4">
				<Summary />

				<TransactionsTable className="mt-16" />
			</div>
		</TransactionsProvider>
	)
}
