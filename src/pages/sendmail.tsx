/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useAuth from '../common/hooks/useAuth'
import { AppLogo, AppLogo, SendMail } from '../common/static/images'

const SignUp: NextPage = () => {
  const auth = useAuth()
  const router = useRouter()

  //   const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.isLogin && auth.isEmailVerified) {
      router.push('/home')
    }
    if (auth.isLogin && !auth.isEmailVerified) {
      router.push('/verifyemail')
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
          <Image width="240" height="60" alt="icon" src={AppLogo} />
        </Box>
        <Box>
          <Image width="240" height="240" alt="sendmail" src={SendMail} />
        </Box>
        <Box>
          <Typography
            color="primary"
            fontWeight="bold"
            align="center"
            variant="h5"
          >
            Thank You!!
          </Typography>
          <Typography
            color="primary"
            align="center"
            variant="subtitle1"
            fontWeight="bold"
          >
            ご登録いただいたメールアドレスに
            <br />
            メールを送信しましたのでご確認ください。
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
