import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, ReactElement, useMemo, useState } from 'react'

type AuthContextType = {
  user: User | null
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // init
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  onAuthStateChanged(auth, (newUser) => {
    setUser(newUser)
  })

  const signOut = async (): Promise<void> => {
    await auth.signOut()
  }

  const val = useMemo(() => ({ user, signOut }), [auth])

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export default AuthProvider
