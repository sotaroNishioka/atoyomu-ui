import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import React, { createContext, ReactElement, useMemo, useState } from 'react'
import firebaseApp from '../firebaseInit'

type UserContextType = {
  user: User | null | undefined
  googleLogin: () => void
  logOut: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

const UserProvider = ({ children }: { children: ReactElement<any, any> }) => {
  const auth = getAuth(firebaseApp)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)
  })

  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = () => {
    signOut(auth)
  }

  const val = useMemo(
    () => ({ user: currentUser, googleLogin, logOut }),
    [currentUser]
  )

  return <UserContext.Provider value={val}>{children}</UserContext.Provider>
}

export default UserProvider
