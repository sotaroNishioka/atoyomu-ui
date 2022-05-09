/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import useKeyboard from '../../../../common/hooks/useKeyboard'
import useLogIn from '../../hooks/useLogin'
import EmailButton from '../ui-elements/EmailButton'
import GoogleButton from '../ui-elements/GoogleButton'

export const LoginForm = () => {
  // hooks
  const keyBoard = useKeyboard()
  const {
    passwordError,
    setEmail,
    setPassword,
    emailError,
    loginWithEmail,
    loginWithGoogle
  } = useLogIn()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <Typography color="primary" fontWeight="bold" align="left" variant="h5">
        ログイン
      </Typography>
      <Typography
        color="primary"
        align="left"
        variant="subtitle1"
        sx={{ mb: 4, mt: 2 }}
      >
        メールアドレスとパスワードを入力してください。
      </Typography>
      <TextField
        margin="dense"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        type="email"
        autoFocus
        onChange={(event) => setEmail(event.target.value)}
        onKeyPress={(event) => keyBoard.onPressEnter(loginWithEmail, event)}
      />
      <FormHelperText error>
        {emailError === '' ? '　' : emailError}
      </FormHelperText>
      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        onKeyPress={(event) => keyBoard.onPressEnter(loginWithEmail, event)}
      />
      <FormHelperText error>
        {passwordError === '' ? '　' : passwordError}
      </FormHelperText>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/signup" variant="body2">
            はじめての方はこちら
          </Link>
        </Grid>
      </Grid>
      <EmailButton onClick={loginWithEmail} text="ログイン" />
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/resetpassword" variant="body2">
            パスワードをお忘れの方はこちら
          </Link>
        </Grid>
      </Grid>
      <GoogleButton
        onClick={loginWithGoogle}
        text="Googleアカウントでログイン"
      />
    </Box>
  )
}
