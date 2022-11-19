import { useContext } from "react"
import { Routes as Router, Route, Navigate } from "react-router-dom"
import { Application } from "./components/Application"
import { LoginPage } from "./components/LoginPage"
import { AuthContext } from "./contexts/AuthContext"

export const Routes = () => {
  const { isLogged } = useContext(AuthContext)

  return (
    <Router>
      <Route path="/" element={<LoginPage />} />

      {isLogged && <Route path='dashboard' element={<Application />} />}
      <Route path="*" element={<Navigate to='/' replace />}/>
    </Router>
  )
}