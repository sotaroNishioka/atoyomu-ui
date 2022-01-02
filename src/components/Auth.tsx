import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import useUser from '../lib/useUser'

const Auth = ({ children }: { children: ReactElement<any, any> }) => {
  //router
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (user.currentUser === null) {
      router.push('/login')
    }
  }, [user.currentUser])

  //何もなければ次へ（そのまま処理）
  return children
}

export default Auth
