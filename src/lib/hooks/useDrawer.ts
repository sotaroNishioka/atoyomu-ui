import { useContext } from 'react'
import { DrawerContext } from '../provider/DrawerProvider'

const useDrawer = () => useContext(DrawerContext)

export default useDrawer
