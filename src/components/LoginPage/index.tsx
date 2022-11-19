import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../../hooks/useAuth'
import { Container } from './styles'

export const LoginPage: React.FC = () => {
  const { login } = useAuth()

  return (
    <Container>
      <div className='main'>
        <h2>Fazer Login</h2>
        <button onClick={login} type='button'> <FcGoogle size={25} /> Google</button>
      </div>
    </Container>
  )
}
