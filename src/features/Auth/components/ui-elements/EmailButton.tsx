import { Email } from '@mui/icons-material'
import { Button } from '@mui/material'
import useLoading from '../../../../common/hooks/useLoading'

const EmailButton: React.FC<{ onClick: () => Promise<void> }> = ({
  onClick
}) => {
  const loading = useLoading()
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
      startIcon={<Email />}
      disabled={loading.isLoading}
    >
      新規登録
    </Button>
  )
}

export default EmailButton
