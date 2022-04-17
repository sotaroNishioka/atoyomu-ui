import { getAuth } from 'firebase/auth'

const useLogOut = () => {
  const auth = getAuth()

  const logOut = () => auth.signOut()

  return { logOut }
}

export default useLogOut
