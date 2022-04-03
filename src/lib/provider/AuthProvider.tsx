import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { createContext, ReactElement, useMemo, useState } from 'react'
import {
  EMAIL_ALREADY_IN_USE,
  EXPIRED_TEMPORALY_REGISTER,
  INVALID_TEMPORALY_REGISTER,
  SIGNUP_UNEXPECTED_ERROR
} from '../../static/message'
import { temporarilyRegisterConverter } from '../firebase/converter'
import firebaseApp, { db } from '../firebase/firebaseInit'
import useMail from '../hooks/useMail'
import useMessage from '../hooks/useMessage'

type AuthContextType = {
  user: User | null | undefined
  isLogin: boolean
  isEmailVerified: boolean
  temporarilyRegister: (email: string) => void
  googleLogin: () => void
  logOut: () => void
  getEmailByRegisterId: (id: string | undefined | string[]) => Promise<string>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // init
  const auth = getAuth(firebaseApp)

  // hooks
  const router = useRouter()
  const mail = useMail()
  const message = useMessage()

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
  const temporarilyRegister = async (email: string) => {
    mail.sendSignUpMail(email)
    router.push('/sendmail')
  }

  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = () => {
    signOut(auth)
  }

  const getEmailByRegisterId = async (
    id: string | undefined | string[]
  ): Promise<string> => {
    if (typeof id !== 'string') {
      message.showMessage(INVALID_TEMPORALY_REGISTER)
      return ''
    }
    const registerDetail = await (
      await getDoc(
        doc(db, 'temporarilyRegister', id).withConverter(
          temporarilyRegisterConverter
        )
      )
    ).data()
    if (registerDetail === undefined) {
      message.showMessage(INVALID_TEMPORALY_REGISTER)
      return ''
    }
    if (registerDetail.expiredAt < new Date()) {
      message.showMessage(EXPIRED_TEMPORALY_REGISTER)
      return ''
    }
    return registerDetail.email
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      const errorCode = error.code
      if (errorCode === 'auth/email-already-in-use') {
        message.showMessage(EMAIL_ALREADY_IN_USE)
        return
      }
      message.showMessage(SIGNUP_UNEXPECTED_ERROR)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      const errorCode = error.code
      if (errorCode === 'auth/email-already-in-use') {
        message.showMessage(EMAIL_ALREADY_IN_USE)
        return
      }
      message.showMessage(SIGNUP_UNEXPECTED_ERROR)
    }
  }

  const val = useMemo(
    () => ({
      user: currentUser,
      isLogin,
      isEmailVerified,
      temporarilyRegister,
      googleLogin,
      logOut,
      getEmailByRegisterId,
      signUpWithEmail,
      signInWithEmail
    }),
    [currentUser]
  )

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export default AuthProvider
