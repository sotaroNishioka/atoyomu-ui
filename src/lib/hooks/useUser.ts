import { useContext } from 'react'
import { UserContext } from '../provider/UserProvider'

const useUser = () => useContext(UserContext)

export default useUser
