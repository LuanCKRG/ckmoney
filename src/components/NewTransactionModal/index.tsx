import Modal from 'react-modal'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import { FormEvent, useState } from 'react'
import { useDatabase } from '../../hooks/useDatabase'

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [type, setType] = useState<string>('withdraw')
  const [category, setCategory] = useState<string>('')
  const today = new Date(Date.now())
  const date: string = today.toLocaleDateString()

  const { addTransaction } = useDatabase()

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()  
    addTransaction({title, value, type, category, date})

    setType('withdraw')
    setTitle('')
    setValue(0)
    setCategory('')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >

      <button className='react-modal-close' type='button' onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Título' required />
        <input value={value} onChange={(e) => setValue(+e.target.value)} placeholder='Valor' type='number' required />
        <TransactionTypeContainer>
          <RadioBox
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor='green'
            type='button'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor='red'
            type='button'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Categoria' required />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}