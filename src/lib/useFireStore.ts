import { getFirestore } from 'firebase/firestore'

export const useFirestore = () => {
  const db = getFirestore()
  return db
}
