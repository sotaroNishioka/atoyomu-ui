import { useContext } from 'react'
import { MessageContext } from '../provider/MessageProvider'

const useDrawer = () => useContext(MessageContext)

export default useDrawer
