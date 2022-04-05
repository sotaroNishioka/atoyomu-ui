import { useContext } from 'react'
import { DrawerContext } from '../providers/DrawerProvider'

const useDrawer = () => useContext(DrawerContext)

export default useDrawer
