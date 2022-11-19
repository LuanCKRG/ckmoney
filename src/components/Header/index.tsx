import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenModal: () => void
}

export const Header = ({ onOpenModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt='ck money' />
        <button onClick={onOpenModal} type='button'>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}