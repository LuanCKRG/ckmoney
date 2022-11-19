import { useState } from "react"
import { Dashboard } from "../Dashboard"
import { Header } from "../Header"
import { NewTransactionModal } from "../NewTransactionModal"
import Modal from 'react-modal'


Modal.setAppElement('#root')

export const Application = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <Header onOpenModal={handleOpenModal} />

      <NewTransactionModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />

      <Dashboard />
    </>
  )
}