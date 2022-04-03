/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from '../lib/hooks/useAuth'
import { isValidEmail, isValidPassword } from '../lib/util/validator'

const Register: NextPage = () => {
  const auth = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password1, setPassword1] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [isValidInput, setIsValidInput] = useState<boolean>(false)

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.isLogin) {
      router.push('/home')
    }
  }, [auth.isLogin])

  // next-routerが準備可能な場合にURLQueryからメールアドレスを取得する
  useEffect(() => {
    const f = async () => {
      if (router.isReady) {
        setEmail(await auth.getEmailByRegisterId(router.query.id))
      }
    }
    f()
  }, [router.isReady])

  // 入力内容がすべて正しい場合は決定ボタンを押下可能にする
  useEffect(() => {
    setIsValidInput(
      isValidEmail(email) &&
        isValidPassword(password1) &&
        password1 === password2
    )
  }, [password1, password2, email])

  const onClickSignUp = () => {
    auth.signUpWithEmail(email, password2)
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
          <Image width="240" height="60" alt="icon" src="/icon.svg" />
        </Box>
        <Box maxWidth={480} sx={{ width: 1 }}>
          <Typography
            color="primary"
            fontWeight="bold"
            align="left"
            variant="h5"
          >
            プロフィール登録
          </Typography>
          <Typography
            color="primary"
            align="left"
            variant="subtitle1"
            sx={{ mb: 5 }}
          >
            新規ユーザーを作成します。
            <br />
            プロフィールを入力してください。
          </Typography>
          <Typography color="primary" variant="subtitle1">
            メールアドレス
          </Typography>
          <TextField
            required
            fullWidth
            disabled
            value={email}
            variant="standard"
          />
          <FormHelperText sx={{ mb: 4 }}>
            仮登録でご登録いただいたメールアドレスです。
            <br />
            変更される場合は再度新規登録を行ってください。
          </FormHelperText>
          <Typography color="primary" variant="subtitle1">
            パスワード
          </Typography>
          <TextField
            value={password1}
            onChange={(event) => setPassword1(event.target.value)}
            required
            fullWidth
            name="password"
            type="password"
            id="password1"
            variant="outlined"
          />
          <FormHelperText
            sx={{ mb: 4 }}
            error={password1 !== '' && isValidPassword(password1) === false}
          >
            パスワードの長さは8-16文字です。
            <br />
            パスワードには英小文字、大文字、数字、記号のうち3種類以上使用してください。
            <br />
          </FormHelperText>
          <Typography color="primary" variant="subtitle1">
            パスワード（再入力）
          </Typography>
          <TextField
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            required
            fullWidth
            name="password"
            type="password"
            id="password2"
            variant="outlined"
          />
          <FormHelperText error sx={{ mb: 4 }}>
            {password2 !== '' && password1 !== password2
              ? 'パスワードが一致しません。'
              : '　'}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={onClickSignUp}
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValidInput}
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
