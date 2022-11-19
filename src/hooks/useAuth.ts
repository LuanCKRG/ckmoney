import { useContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { AuthContext } from '../contexts/AuthContext'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

interface useAuthProps {
  (): { login: () => void, email: string }
}

export const useAuth: useAuthProps = () => {
  const { setIsLogged } = useContext(AuthContext)
  const { email, setEmail } = useContext(UserContext)
  const provider = new GoogleAuthProvider()
  const auth = getAuth(app)
  const navigate = useNavigate()

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      typeof user.email === 'string' && setEmail(user.email)
      setIsLogged(true)
      navigate('/dashboard')
    }
    catch (error: any) {
      console.error(error)
      setIsLogged(false)
    }
  }

  return ({ login, email })
}