import { ReactElement } from 'react'

const Auth = ({ children }: { children: ReactElement<any, any> }) => {
  // const router = useRouter()
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (
  //     router.pathname === '/' ||
  //     router.pathname === '/login' ||
  //     router.pathname === '/signup'
  //   )
  //     return
  //   if (user === null) {
  //     // router.push('/')
  //   }
  //   if (user !== null && user.isEmailVerified === false) {
  //     console.log(
  //       'if (user.isLogin === true && user.isEmailVerified === false) {'
  //     )
  //     // router.push('/verifyemail')
  //   }
  // }, [user.user])

  // // 何もなければ次へ（そのまま処理）
  return children
}

export default Auth
