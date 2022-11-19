import { GlobalStyle } from './styles/global'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './Routes'
import { UserProvider } from './contexts/UserContext'


export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}