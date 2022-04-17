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
import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useKeyboard from '../common/hooks/useKeyboard'
import { AppLogo } from '../common/static/images'
import { isValidEmail, isValidPassword } from '../common/util/validator'

const Login: NextPage = () => {
  // hooks
  const router = useRouter()
  const keyBoard = useKeyboard()
  const auth = getAuth()

  // state
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  // effect
  useEffect(() => {
    if (auth.currentUser !== null) {
      router.push('/home')
    }
  }, [auth.currentUser])

  // functions

  /**
   * メールでのログインサブミット時の処理。
   * メールアドレスやパスワードの内容が適したフォーマットであるか確認してから、ログイン処理を実行する。
   * @returns void
   */
  const onSubmitEmailLogin = async () => {
    let error = false
    setEmailError('')
    setPasswordError('')
    if (isValidEmail(email) === false) {
      setEmailError('メールアドレスの形式が正しくありません。')
      error = true
    }
    if (email === '') {
      setEmailError('メールアドレスを入力してください。')
      error = true
    }
    if (isValidPassword(password) === false) {
      setPasswordError(
        'パスワードには英小文字、大文字、数字、記号のうち3種類以上使用してください。'
      )
      error = true
    }
    if (password.length > 0 && (password.length < 8 || password.length > 16)) {
      setPasswordError('パスワードの長さは8-16文字です。')
      error = true
    }
    if (password === '') {
      setPasswordError('パスワードを入力してください。')
      error = true
    }
    console.log(error)
    // if (error) {
    //   return
    // }
    // await auth.signInWithEmail(email, password)
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
          <Image width="300" height="75" src={AppLogo} />
        </Box>
        <Box maxWidth={480} sx={{ width: 1 }}>
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
            onKeyPress={(event) =>
              keyBoard.onPressEnter(onSubmitEmailLogin, event)
            }
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
            onKeyPress={(event) =>
              keyBoard.onPressEnter(onSubmitEmailLogin, event)
            }
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

          <Grid container justifyContent="center">
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitEmailLogin}
              >
                ログイン
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
                Google&nbsp;&nbsp;&nbsp;&nbsp;アカウントでログイン
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
                Facebook&nbsp;アカウントでログイン
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
                Twitter&nbsp;&nbsp;&nbsp;&nbsp;アカウントでログイン
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
