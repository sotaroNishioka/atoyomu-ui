import { Card, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Auth from '../components/Auth'
import useUser from '../lib/hooks/useUser'

const Index: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (user.user !== null) {
      router.push('/home')
    }
  }, [user.user])

  return (
    <Auth>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '200vh' }}
        >
          <Grid item xs={6}>
            <Card variant="outlined">LOGIN</Card>
          </Grid>
        </Grid>
      </div>
    </Auth>
  )
}

export default Index
