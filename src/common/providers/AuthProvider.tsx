import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { createContext, ReactElement, useMemo, useState } from 'react'
import { temporarilyRegisterConverter } from '../firebase/converter'
import { db, firebaseApp } from '../firebase/firebaseApp'
import useMail from '../hooks/useMail'
import useMessage from '../hooks/useMessage'
import {
  EMAIL_ALREADY_IN_USE,
  EXPIRED_TEMPORALY_REGISTER,
  INVALID_TEMPORALY_REGISTER,
  SIGNUP_UNEXPECTED_ERROR
} from '../static/texts/message'
import { AuthContextType } from '../types/providers/AuthProviderType'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // init
  const auth = getAuth(firebaseApp)

  // hooks
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
  const createTemporarilyRegister = async (email: string) => {
    await mail.sendSignUpMail(email)
  }

  const signUpWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      const { displayName, email, photoURL, uid } = user
    } catch (e: any) {
      // popupの中断などでエラーがあっても何もしない
    }
  }

  // ユーザー認証が必要なのでペンディング
  const signUpWithTwitter = () => {
    // signInWithPopup(auth, new TwitterAuthProvider())
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

  const getIsEmailUserExsits = async (email: string): Promise<boolean> => {
    const result = await fetchSignInMethodsForEmail(auth, email)
    if (
      result[0] === EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD ||
      result[0] === EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    ) {
      return true
    }
    return false
  }

  const val = useMemo(
    () => ({
      user: currentUser,
      isLogin,
      isEmailVerified,
      signUpWithEmail,
      signUpWithGoogle,
      signUpWithTwitter,
      signInWithEmail,
      logOut,
      createTemporarilyRegister,
      getEmailByRegisterId,
      getIsEmailUserExsits
    }),
    [currentUser]
  )

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export default AuthProvider
