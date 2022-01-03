import { Box, Card, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Logo from '../../public/icon.svg'
import Auth from '../components/Auth'
import Header from '../components/Header'
import useUser from '../lib/hooks/useUser'

const Login: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    console.log(Logo)
    if (user.currentUser !== null && user.currentUser !== undefined) {
      router.push('/')
    }
  }, [user.currentUser])

  // const onClickLogin = () => {
  //   user.googleLogin()
  // }

  return (
    <Auth>
      <div>
        <Header />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '200vh' }}
        >
          <Grid item xs={6}>
            <Box>
              <img height="34px" alt="icon" src="/icon.svg" />
            </Box>
            <Card variant="outlined">this is card</Card>
          </Grid>
        </Grid>
      </div>
    </Auth>
  )
}

export default Login
