import { database, app } from '../firebase'
import { transactionProps } from '../types'
import { useAuth } from './useAuth'

interface useDatabaseProps {
  (): {
    addTransaction: (transaction: transactionProps) => Promise<void>,
    getAllTransactions: () => Promise<transactionProps[]>,
    getSummary: () => Promise<{income: number, outcome: number, total: number}>
  }
}

export const useDatabase: useDatabaseProps = () => {
  const { getFirestore, collection, getDocs, setDoc, doc } = database
  const db = getFirestore(app)
  const { email } = useAuth()

  const transactionRef = collection(db, email)

  async function addTransaction(transaction: transactionProps) {
    try {
      await setDoc(doc(transactionRef, transaction.title), transaction)
    }
    catch (e) {
      console.error('deu esse erro ai o: ', e)
    }
  }

  async function getAllTransactions() {
    const querySnapshot = await getDocs(collection(db, email))
    const data: transactionProps[] = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as transactionProps)
    })

    return data
  }

  async function getSummary() {
    const querySnapshot = await getDocs(collection(db, email))
    let income: number = 0
    let outcome: number = 0
    querySnapshot.forEach((doc) => {
      if (doc.data().type === 'deposit'){
        income += doc.data().value
      }
      else {
        outcome += doc.data().value
      }
    })
    const total: number = income - outcome

    return {income, outcome, total}
  }

  return ({ addTransaction, getAllTransactions, getSummary })
}
