import { Box, Grid, Link } from '@mui/material'
import useSignUp from '../../hooks/useSignUp'
import EmailButton from '../ui-elements/EmailButton'
import GoogleSignUpButton from '../ui-elements/GoogleButton'
import SignUpEmailTextField from '../ui-elements/SignUpEmailTextField'

export const SignUpForm = () => {
  const {
    email,
    emailError,
    setEmail,
    signUpWithGoogle,
    // signUpWithTwitter,
    onSubmitEmailSignup
  } = useSignUp()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <SignUpEmailTextField
        email={email}
        emailError={emailError}
        onChange={setEmail}
        onSubmit={onSubmitEmailSignup}
      />
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/login" variant="body2">
            登録済みの方はこちら
          </Link>
        </Grid>
      </Grid>
      <EmailButton onClick={onSubmitEmailSignup} text="新規登録" />
      <GoogleSignUpButton
        onClick={signUpWithGoogle}
        text="Googleアカウントで登録"
      />
      {/* <FacebookSignUpButton onClick={signUpWithTwitter} />
      <TwitterSignUpButton onClick={signUpWithTwitter} /> */}
    </Box>
  )
}
