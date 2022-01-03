import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { useState } from 'react'
import firebaseApp from '../firebaseInit'

const useUser = () => {
  const auth = getAuth(firebaseApp)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  onAuthStateChanged(auth, (user) => {
    console.log(currentUser)
    setCurrentUser(user)
  })

  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = () => {
    signOut(auth)
  }

  return {
    currentUser,
    googleLogin,
    logOut
  }
}

export default useUser
