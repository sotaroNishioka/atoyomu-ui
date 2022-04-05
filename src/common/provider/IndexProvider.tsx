import { ReactElement } from 'react'
import UserProvider from './AuthProvider'
import DrawerProvider from './DrawerProvider'
import MessageProvider from './MessageProvider'

const IndexProvider = ({ children }: { children: ReactElement<any, any> }) => (
  <MessageProvider>
    <DrawerProvider>
      <UserProvider>{children}</UserProvider>
    </DrawerProvider>
  </MessageProvider>
)

export default IndexProvider
