import { useContext } from 'react'
import { MessageContext } from '../providers/MessageProvider'

const useDrawer = () => useContext(MessageContext)

export default useDrawer
