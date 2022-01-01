import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebaseApp from '../lib/firebaseInit'
const useUser = (redirectUrl = '/login') => {
  const auth = getAuth(firebaseApp)
  const googleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }
  return {
    currentUser: auth.currentUser,
    googleLogin,
  }
}

export default useUser
