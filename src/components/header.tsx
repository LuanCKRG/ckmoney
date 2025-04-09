import logo from "@/assets/logo.svg"
import { NewTransactionForm } from "@/components/new-transaction-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const Header = () => {
	return (
		<header className="bg-dark-purple">
			<div className="flex justify-between w-full max-w-6xl pt-8 pb-36 px-4 mx-auto">
				<img src={logo} alt="CK Money" />

				<Dialog modal={false}>
					<DialogTrigger asChild>
						<button type="button" className="h-12 px-8 text-base rounded-sm bg-light-purple text-shape hover:brightness-90 duration-200">
							Nova transação
						</button>
					</DialogTrigger>
					<DialogContent className="bg-background max-w-xl p-4 rounded-sm">
						<DialogHeader>
							<DialogTitle className="text-title text-2xl mb-8">Cadastrar transação</DialogTitle>
						</DialogHeader>

						<NewTransactionForm />
					</DialogContent>
				</Dialog>
			</div>
		</header>
	)
}
