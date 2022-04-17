import { ReactElement } from 'react'
import DrawerProvider from './DrawerProvider'
import LoadingProvider from './LoadingProvider'
import MessageProvider from './MessageProvider'

const IndexProvider = ({ children }: { children: ReactElement<any, any> }) => (
  <MessageProvider>
    <LoadingProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </LoadingProvider>
  </MessageProvider>
)

export default IndexProvider
