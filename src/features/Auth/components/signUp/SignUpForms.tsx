import { Box, Grid, Link } from '@mui/material'
import useSignUp from '../../hooks/useSignUp'
import EmailSignUpButton from './EmailSignUpButton'
import FacebookSignUpButton from './FacebookSignUpButton'
import GoogleSignUpButton from './GoogleSignUpButton'
import SignUpEmailTextField from './SignUpEmailTextField'
import TwitterSignUpButton from './TwitterSignUpButton'

const SignUpForm = () => {
  const {
    email,
    emailError,
    setEmail,
    signUpWithGoogle,
    signUpWithTwitter,
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
      <EmailSignUpButton onClick={onSubmitEmailSignup} />
      <GoogleSignUpButton onClick={signUpWithGoogle} />
      <FacebookSignUpButton onClick={signUpWithTwitter} />
      <TwitterSignUpButton onClick={signUpWithTwitter} />
    </Box>
  )
}

export default SignUpForm
