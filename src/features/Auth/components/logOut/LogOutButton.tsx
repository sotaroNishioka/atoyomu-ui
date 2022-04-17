import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'
import useLogout from '../../hooks/useLogOut'

export const LogOutButton: React.FC = () => {
  const logOut = useLogout()
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={logOut.logOut}
      startIcon={<ExitToAppIcon />}
    >
      ログアウト
    </Button>
  )
}
