import { ReactElement } from 'react'
import DrawerProvider from './DrawerProvider'
import UserProvider from './UserProvider'

const IndexProvider = ({ children }: { children: ReactElement<any, any> }) => (
  <DrawerProvider>
    <UserProvider>{children}</UserProvider>
  </DrawerProvider>
)

export default IndexProvider
