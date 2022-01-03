import { ReactElement } from 'react'
import DrawerProvider from './DrawerProvider'

const IndexProvider = ({ children }: { children: ReactElement<any, any> }) => (
  <DrawerProvider>{children}</DrawerProvider>
)

export default IndexProvider
