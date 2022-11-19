import { createContext, ReactNode, SetStateAction, useState } from 'react'

interface AuthContextType  {
  isLogged: boolean,
  setIsLogged: React.Dispatch<SetStateAction<boolean>>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ isLogged, setIsLogged ] = useState<boolean>(false)

  return(
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
      {children}
    </AuthContext.Provider>
  )
}