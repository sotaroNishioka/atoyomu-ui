import Google from '@mui/icons-material/Google'
import { Button } from '@mui/material'

const GoogleSignUpButton: React.FC<{ onClick: () => Promise<void> }> = ({
  onClick
}) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 2,
      mb: 2,
      backgroundColor: '#4285F4',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#4285F4'
      }
    }}
    onClick={onClick}
    startIcon={<Google />}
  >
    Google&nbsp;&nbsp;&nbsp;&nbsp;アカウントで登録
  </Button>
)

export default GoogleSignUpButton
