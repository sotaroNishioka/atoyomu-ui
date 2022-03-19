/* eslint-disable jsx-a11y/anchor-is-valid */
import { Facebook, Twitter } from '@mui/icons-material'
import GoogleIcon from '@mui/icons-material/Google'
import { Box, Button, Container, Grid, Link, TextField } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useAuth from '../lib/hooks/useAuth'

const SignUp: NextPage = () => {
  const auth = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.isLogin) {
      router.push('/home')
    }
  }, [auth.isLogin])

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box>
          <Image width="240" height="60" alt="icon" src="/icon.svg" />
        </Box>
        <Box maxWidth={380} sx={{ mt: 1 }}>
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            type="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
          />
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
            onClick={() => auth.singUpWithEmail(email, password)}
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
