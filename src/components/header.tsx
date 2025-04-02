import logo from "@/assets/logo.svg"

export const Header = () => {
	return (
		<header className="bg-dark-purple">
			<div className="flex justify-between w-full max-w-6xl pt-8 pb-48 px-4 mx-auto">
				<img src={logo} alt="CK Money" />

				<button type="button" className="h-12 px-8 text-base rounded-sm bg-light-purple text-shape hover:brightness-90 duration-200">
					Nova transação
				</button>
			</div>
		</header>
	)
}
