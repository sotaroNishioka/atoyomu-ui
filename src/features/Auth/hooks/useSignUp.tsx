import {
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { db } from '../../../common/firebase/firebaseApp'
import useMail from '../../../common/hooks/useMail'
import { isValidEmail } from '../../../common/util/validator'

const useSignUp = () => {
  const auth = getAuth()
  const mail = useMail()
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  const createUsersData = async (user: User) => {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      providerData: user.providerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  }

  const getIsEmailUserExsits = async (emailArg: string): Promise<boolean> => {
    const result = await fetchSignInMethodsForEmail(auth, emailArg)
    if (result.length !== 0) {
      return true
    }
    return false
  }

  const signUpWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      await createUsersData(user)
    } catch (e: any) {
      // popupの中断などでエラーがあっても何もしない
    }
  }

  // ユーザー認証が必要なのでペンディング
  const signUpWithTwitter = async (): Promise<void> => {
    // eslint-disable-next-line no-alert
    alert('Twitterログインは実装中')
  }

  const createTemporarilyRegister = async (emailArg: string) => {
    await mail.sendSignUpMail(emailArg)
  }

  const onSubmitEmailSignup = async () => {
    let error = false
    setEmailError('')
    if (isValidEmail(email) === false) {
      setEmailError('メールアドレスの形式が正しくありません。')
      error = true
    }
    if (email === '') {
      setEmailError('メールアドレスを入力してください。')
      error = true
    }
    if (error) {
      return
    }
    const isEmailExsits = await getIsEmailUserExsits(email)
    if (isEmailExsits === true) {
      setEmailError('このメールアドレスは既に登録されています')
      error = true
    }
    if (error) {
      return
    }
    await createTemporarilyRegister(email)
    router.push('/sendmail')
  }

  return {
    email,
    emailError,
    setEmail,
    signUpWithGoogle,
    signUpWithTwitter,
    onSubmitEmailSignup
  }
}

export default useSignUp
