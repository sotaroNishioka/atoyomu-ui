import { Box, FormHelperText, TextField } from '@mui/material'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useKeyboard from '../../../../common/hooks/useKeyboard'
import useLoading from '../../../../common/hooks/useLoading'
import useMessage from '../../../../common/hooks/useMessage'
import { isValidEmail } from '../../../../common/util/validator'
import useSignUp from '../../hooks/useSignUp'
import {
  FAILED_RESET_PASSWORD,
  RESET_PASSWORD_EMAIL_IS_NOT_EXSITS
} from '../../statics/texts/message'
import EmailButton from '../ui-elements/EmailButton'

export const ResetPasswordForm = () => {
  const auth = getAuth()
  const loading = useLoading()
  const message = useMessage()
  const keyBoard = useKeyboard()
  const router = useRouter()
  const { getIsEmailUserExsits } = useSignUp()
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  const isValidInput = (): boolean => {
    let error = false
    setEmailError('')
    if (isValidEmail(email) === false) {
      setEmailError('メールアドレスの形式が正しくありません。')
      error = true
    }
    if (email === '') {
      setEmailError('メールアドレスを入力してください。')
      error = true
    }
    if (error) {
      return false
    }
    return true
  }

  const onSubmitPassReset = async (): Promise<void> => {
    loading.startLoading()
    if (isValidInput() === false) {
      loading.finishLoading()
      return
    }
    const isExsitsMail = await getIsEmailUserExsits(email)
    if (isExsitsMail === false) {
      message.showMessage(RESET_PASSWORD_EMAIL_IS_NOT_EXSITS)
      loading.finishLoading()
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      router.push('/sendmail')
    } catch (e: any) {
      message.showMessage(FAILED_RESET_PASSWORD)
    } finally {
      loading.finishLoading()
    }
  }

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <FormHelperText sx={{ mb: 4 }}>
        ご登録済みのメールアドレスを入力してください。
        <br />
        ご指定のメールアドレスに、パスワードリセット用のURLをお送りします。
      </FormHelperText>
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
        onKeyPress={(event) => keyBoard.onPressEnter(onSubmitPassReset, event)}
      />
      <FormHelperText error>
        {emailError === '' ? '　' : emailError}
      </FormHelperText>
      <EmailButton onClick={onSubmitPassReset} text="パスワードをリセット" />
    </Box>
  )
}
