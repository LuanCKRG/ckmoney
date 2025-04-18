import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTransactions } from "@/contexts/transactions-context"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Info } from "lucide-react"

// const TRANSACTIONS: TransactionProps[] = [
// 	{
// 		id: 1,
// 		value: 3500,
// 		title: "Salário",
// 		type: "income",
// 		date: "15/03/2024",
// 		category: "Trabalho"
// 	},
// 	{
// 		id: 2,
// 		value: 200,
// 		title: "Aluguel",
// 		type: "outcome",
// 		date: "10/03/2024",
// 		category: "Casa"
// 	},
// 	{
// 		id: 3,
// 		value: 1200,
// 		title: "Freelance",
// 		type: "income",
// 		date: "12/03/2024",
// 		category: "Trabalho"
// 	},
// 	{
// 		id: 4,
// 		value: 450,
// 		title: "Supermercado",
// 		type: "outcome",
// 		date: "14/03/2024",
// 		category: "Alimentação"
// 	},
// 	{
// 		id: 5,
// 		value: 800,
// 		title: "Venda Bike",
// 		type: "income",
// 		date: "08/03/2024",
// 		category: "Lazer"
// 	},
// 	{
// 		id: 6,
// 		value: 90,
// 		title: "Internet",
// 		type: "outcome",
// 		date: "05/03/2024",
// 		category: "Casa"
// 	},
// 	{
// 		id: 7,
// 		value: 75,
// 		title: "Cinema",
// 		type: "outcome",
// 		date: "17/03/2024",
// 		category: "Lazer"
// 	},
// 	{
// 		id: 8,
// 		value: 35,
// 		title: "Uber",
// 		type: "outcome",
// 		date: "13/03/2024",
// 		category: "Transporte"
// 	},
// 	{
// 		id: 9,
// 		value: 300,
// 		title: "Curso Online",
// 		type: "outcome",
// 		date: "01/03/2024",
// 		category: "Educação"
// 	},
// 	{
// 		id: 10,
// 		value: 15,
// 		title: "Cafeteria",
// 		type: "outcome",
// 		date: "19/03/2024",
// 		category: "Alimentação"
// 	}
// ]

interface TransactionsTableProps {
	className?: string
}

export const TransactionsTable = ({ className }: TransactionsTableProps) => {
	const { transactions } = useTransactions()

	return (
		<Table className={cn("", className)}>
			<TableHeader>
				<TableRow>
					<TableHead>Título</TableHead>
					<TableHead>Valor</TableHead>
					<TableHead>Categoria</TableHead>
					<TableHead className="w-[25px]">Obs.</TableHead>
					<TableHead>Data</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{transactions.map((transaction) => (
					<TableRow key={transaction.id}>
						<TableCell className="font-medium">{transaction.title}</TableCell>
						<TableCell className={cn("text-primary-green", transaction.type === "outcome" && "text-primary-red")}>
							{Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL"
							}).format(transaction.value)}
						</TableCell>
						<TableCell>{transaction.category}</TableCell>
						<TableCell>
							{transaction.note && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Info className="size-4" />
										</TooltipTrigger>
										<TooltipContent>
											<p>{transaction.note}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</TableCell>
						<TableCell>{format(transaction.date, "P", { locale: ptBR })}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
