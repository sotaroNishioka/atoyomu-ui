import React, {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState
} from 'react'

type DrawerContextType = {
  isOpen: boolean
  closeDrawer: () => void
  openDrawer: () => void
}

export const DrawerContext = createContext<DrawerContextType>(
  {} as DrawerContextType
)

const DrawerProvider = ({ children }: { children: ReactElement<any, any> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const closeDrawer = useCallback(() => setIsOpen(false), [])
  const openDrawer = useCallback(() => setIsOpen(true), [])
  const val = useMemo(() => ({ isOpen, closeDrawer, openDrawer }), [isOpen])

  return <DrawerContext.Provider value={val}>{children}</DrawerContext.Provider>
}

export default DrawerProvider
