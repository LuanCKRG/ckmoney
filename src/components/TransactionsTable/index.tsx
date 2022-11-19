import { useEffect, useState } from 'react'
import { useDatabase } from '../../hooks/useDatabase'
import { transactionProps } from '../../types'
import { Container } from './styles'

export const TransactionsTable: React.FC = () => {
  const { getAllTransactions } = useDatabase()
  const [data, setData] = useState<transactionProps[]>([])
  
  useEffect(() => {
    getAllTransactions().then((d) => setData(d))
  }, [getAllTransactions])

  return (
    <Container>
      <table className='table-responsive'>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {data.map((transaction) => {
            return (
              <tr key={transaction.title}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>{Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.value)}</td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}
