import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import useAuth from '../../common/hooks/useAuth'

const Auth = ({ children }: { children: ReactElement<any, any> }) => {
  const router = useRouter()
  const user = useAuth()

  useEffect(() => {
    if (
      router.pathname === '/' ||
      router.pathname === '/login' ||
      router.pathname === '/signup'
    )
      return
    if (user.isLogin === false) {
      // router.push('/')
    }
    if (user.isLogin === true && user.isEmailVerified === false) {
      console.log(
        'if (user.isLogin === true && user.isEmailVerified === false) {'
      )
      // router.push('/verifyemail')
    }
  }, [user.user])

  // 何もなければ次へ（そのまま処理）
  return children
}

export default Auth
