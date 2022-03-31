import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { createContext, ReactElement, useMemo, useState } from 'react'
import firebaseApp from '../firebase/firebaseInit'
import useMail from '../hooks/useMail'

type AuthContextType = {
  user: User | null | undefined
  isLogin: boolean
  isEmailVerified: boolean
  singUpWithEmail: (email: string) => void
  googleLogin: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // init
  const auth = getAuth(firebaseApp)
  const router = useRouter()
  const mail = useMail()

  // hooks

  // state
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)

  // effect
  onAuthStateChanged(auth, (user) => {
    setIsLogin(user !== null) // 初期状態ではundefinedなのでonAuthStateChangedではnull | Userが渡される
    setCurrentUser(user)
    setIsEmailVerified(
      user?.emailVerified === undefined ? false : user.emailVerified
    )
  })

  // function
  const singUpWithEmail = async (email: string) => {
    mail.sendSignUpMail(email)
    router.push('/sendmail')
  }

  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = () => {
    signOut(auth)
  }

  const val = useMemo(
    () => ({
      user: currentUser,
      isLogin,
      isEmailVerified,
      singUpWithEmail,
      googleLogin,
      logOut
    }),
    [currentUser]
  )

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export default AuthProvider
