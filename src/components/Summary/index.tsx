import { Container } from "./styles"
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useEffect, useState } from "react"
import { useDatabase } from "../../hooks/useDatabase"

export const Summary: React.FC = () => {
  const [amount, setAmount] = useState<{ income: number, outcome: number, total: number }>({ income: 0, outcome: 0, total: 0 })
  const [type, setType] = useState<string>('')
  const { getSummary } = useDatabase()
  useEffect(() => {
    getSummary().then((data) => setAmount(data))
    
    if (amount.total > 0) { setType('green') }
    else if (amount.total < 0) { setType('red') }
    else {setType('white')}

  }, [getSummary, amount.total])
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt='Entradas' />
        </header>
        <strong> {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount.income)} </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt='Saídas' />
        </header>
        <strong> {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount.outcome)} </strong>
      </div>

      <div className={type}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt='Total' />
        </header>
        <strong> {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount.total)}</strong>
      </div>
    </Container>
  )
}