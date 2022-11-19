import { createContext, ReactNode, SetStateAction, useState } from 'react'

interface UserContextType  {
  email: string,
  setEmail: React.Dispatch<SetStateAction<string>>
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [ email, setEmail ] = useState<string>('')

  return(
    <UserContext.Provider value={{email, setEmail}}>
      {children}
    </UserContext.Provider>
  )
}