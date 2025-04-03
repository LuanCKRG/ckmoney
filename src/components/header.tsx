import logo from "@/assets/logo.svg"
import incomeImg from "@/assets/income.svg"
import outcomeImg from "@/assets/outcome.svg"
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog"

export const Header = () => {
	return (
		<header className="bg-dark-purple">
			<div className="flex justify-between w-full max-w-6xl pt-8 pb-36 px-4 mx-auto">
				<img src={logo} alt="CK Money" />

				<Dialog>
					<DialogTrigger asChild>
						<button type="button" className="h-12 px-8 text-base rounded-sm bg-light-purple text-shape hover:brightness-90 duration-200">
							Nova transação
						</button>
					</DialogTrigger>
					<DialogContent className="bg-background max-w-xl p-4 rounded-sm">
						<DialogHeader>
							<DialogTitle className="text-title text-2xl mb-8">Cadastrar transação</DialogTitle>
						</DialogHeader>

						<form>
							<input
								type="text"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Título"
							/>
							<input
								type="text"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Valor"
							/>
							<div className="grid grid-cols-2 gap-2">
								<button className="h-16 border border-neutral-300 rounded-sm flex justify-center items-center bg-transparent space-x-4" type="button">
									<img className="size-5" src={incomeImg} alt="" />
									<span className="text-base text-title">Entrada</span>
								</button>
								<button className="h-16 border border-neutral-300 rounded-sm flex justify-center items-center bg-transparent space-x-4" type="button">
									<img className="size-5" src={outcomeImg} alt="" />
									<span className="text-base text-title">Saída</span>
								</button>
							</div>
							<input
								type="text"
								className="w-full h-16 px-6 border border-neutral-300 rounded-sm placeholder:text-body bg-gray-200 text-base"
								placeholder="Categoria"
							/>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</header>
	)
}
