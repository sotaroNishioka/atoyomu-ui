import { Email } from '@mui/icons-material'
import { Button } from '@mui/material'

const EmailSignUpButton: React.FC<{ onClick: () => Promise<void> }> = ({
  onClick
}) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    onClick={onClick}
    startIcon={<Email />}
  >
    新規登録
  </Button>
)

export default EmailSignUpButton
