import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Router from 'next/router'
import { ReactElement } from 'react'

const UnAuthRoute = ({ children }: { children: ReactElement<any, any> }) => {
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      Router.replace('/')
    }
  })

  return children
}

export default UnAuthRoute
