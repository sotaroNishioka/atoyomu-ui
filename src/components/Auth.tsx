import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import useUser from '../lib/hooks/useUser'

const Auth = ({ children }: { children: ReactElement<any, any> }) => {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/login') return
    if (user.user === null) {
      router.push('/')
    }
  }, [user.user])

  // 何もなければ次へ（そのまま処理）
  return children
}

export default Auth
