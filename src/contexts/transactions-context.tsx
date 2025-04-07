import type { TransactionProps } from "@/types/transaction-type"
import { type ReactNode, createContext, useContext, useEffect, useState } from "react"

interface TransactionsContextData {
	transactions: TransactionProps[]
	addTransaction: (transaction: Omit<TransactionProps, "id">) => void
	removeTransaction: (id: number) => void

	categories: string[]
	addCategory: (newCategory: string) => void
	removeCategory: (categoryToBeRemoved: string) => void
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [transactions, setTransactions] = useState<TransactionProps[]>(() => {
		if (typeof window !== "undefined") {
			const storedTransactions = localStorage.getItem("transactions")
			return storedTransactions ? JSON.parse(storedTransactions) : []
		}
		return []
	})

	const [categories, setCategories] = useState<string[]>(() => {
		if (typeof window !== "undefined") {
			const storedTransactions = localStorage.getItem("categories")
			return storedTransactions ? JSON.parse(storedTransactions) : []
		}
		return []
	})

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("transactions", JSON.stringify(transactions))
		}
	}, [transactions])

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("categories", JSON.stringify(categories))
		}
	}, [categories])

	function addTransaction(transaction: Omit<TransactionProps, "id">) {
		const newTransaction = {
			...transaction,
			id: Date.now()
		}
		setTransactions((prev) => [...prev, newTransaction])
	}

	function removeTransaction(id: number) {
		setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
	}

	function addCategory(newCategory: string) {
		setCategories((prev) => [...prev, newCategory])
	}

	function removeCategory(categoryToBeRemoved: string) {
		setCategories((prev) => prev.filter((category) => category !== categoryToBeRemoved))
	}

	return (
		<TransactionsContext.Provider value={{ transactions, addTransaction, removeTransaction, categories, addCategory, removeCategory }}>
			{children}
		</TransactionsContext.Provider>
	)
}

export const useTransactions = () => {
	const context = useContext(TransactionsContext)
	if (!context) {
		throw new Error("useTransactions must be used within a TransactionsProvider")
	}
	return context
}
