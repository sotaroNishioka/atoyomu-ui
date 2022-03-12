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

type AuthContextType = {
  user: User | null | undefined
  isLogin: boolean
  googleLogin: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // init
  const auth = getAuth(firebaseApp)

  // state
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  // effect
  onAuthStateChanged(auth, (user) => {
    setIsLogin(user !== null) // 初期状態ではundefinedなのでonAuthStateChangedではnull | Userが渡される
    setCurrentUser(user)
  })

  // function
  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = () => {
    signOut(auth)
  }

  const val = useMemo(
    () => ({ user: currentUser, isLogin, googleLogin, logOut }),
    [currentUser]
  )

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export default AuthProvider
