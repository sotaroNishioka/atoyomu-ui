/* eslint-disable jsx-a11y/anchor-is-valid */
import { Facebook, Twitter } from '@mui/icons-material'
import GoogleIcon from '@mui/icons-material/Google'
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Link,
  TextField
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from '../common/hooks/useAuth'
import useKeyboard from '../common/hooks/useKeyboard'
import { AppLogo } from '../common/static/images'
import { isValidEmail } from '../common/util/validator'

const SignUp: NextPage = () => {
  // hooks
  const auth = useAuth()
  const router = useRouter()
  const keyBoard = useKeyboard()

  // state
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  // effect
  useEffect(() => {
    if (auth.isLogin && auth.isEmailVerified) {
      router.push('/home')
    }
  }, [auth.isLogin])

  /**
   * メールでのログインサブミット時の処理。
   * メールアドレスやパスワードの内容が適したフォーマットであるか確認してから、ログイン処理を実行する。
   * @returns void
   */
  const onSubmitEmailSignup = async () => {
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
      return
    }
    await auth.temporarilyRegister(email)
  }

  return (
    <Container>
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Image width="300" height="75" alt="icon" src={AppLogo} />
        </Box>
        <Box maxWidth={480} sx={{ width: 1 }}>
          <TextField
            value={email}
            margin="dense"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            type="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            onKeyPress={(event) =>
              keyBoard.onPressEnter(onSubmitEmailSignup, event)
            }
          />
          <FormHelperText error>
            {emailError === '' ? '　' : emailError}
          </FormHelperText>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                登録済みの方はこちら
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmitEmailSignup}
          >
            新規登録
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                パスワードをお忘れの方はこちら
              </Link>
            </Grid>
          </Grid>
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
            startIcon={<GoogleIcon />}
          >
            Google&nbsp;&nbsp;&nbsp;&nbsp;アカウントで登録
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#3B5998',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#3B5998'
              }
            }}
            startIcon={<Facebook />}
          >
            Facebook&nbsp;アカウントで登録
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#00acee',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#00acee'
              }
            }}
            startIcon={<Twitter />}
          >
            Twitter&nbsp;&nbsp;&nbsp;&nbsp;アカウントで登録
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
