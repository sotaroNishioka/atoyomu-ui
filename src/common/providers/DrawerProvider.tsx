import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import useSize from '../hooks/useSize'

type DrawerContextType = {
  isOpen: boolean
  closeDrawer: () => void
  openDrawer: () => void
}

export const DrawerContext = createContext<DrawerContextType>(
  {} as DrawerContextType
)

const DrawerProvider = ({ children }: { children: ReactElement<any, any> }) => {
  // state
  const { isMobileSize } = useSize()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // effect
  useEffect(() => {
    if (isMobileSize) {
      setIsOpen(false)
      return
    }
    setIsOpen(true)
  }, [isMobileSize])

  // function
  const closeDrawer = useCallback(() => setIsOpen(false), [])
  const openDrawer = useCallback(() => setIsOpen(true), [])
  const val = useMemo(() => ({ isOpen, closeDrawer, openDrawer }), [isOpen])

  return <DrawerContext.Provider value={val}>{children}</DrawerContext.Provider>
}

export default DrawerProvider
