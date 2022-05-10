import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'
import { AppLogo } from '../../common/static/images'
import OutLinedButton from '../ui-elements/OutLinedButton'
import TextButton from '../ui-elements/TextButton'

const Header = () => {
  // init
  const auth = getAuth()
  const drawer = useDrawer()
  const router = useRouter()
  const { isMobileSize } = useSize()

  // state
  const [isLogin, setIsLogin] = useState<boolean>(false)

  // effect
  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      setIsLogin(false)
      return
    }
    setIsLogin(true)
  })

  // functions
  const onClickLogin = () => {
    router.push('/login')
  }
  const onClickSignUp = () => {
    router.push('/signup')
  }

  // 未ログインの場合
  const unregisteredUserMenu = (
    <Box>
      <TextButton
        text="ログイン"
        size="small"
        onClick={onClickLogin}
        sx={{ marginRight: 1 }}
      />
      <OutLinedButton size="small" text="新規登録" onClick={onClickSignUp} />
    </Box>
  )

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'secondary.main',
        backgroundColor: 'primary.light'
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar style={{ maxWidth: 1200, width: '100%' }}>
          {isLogin && isMobileSize && (
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              onClick={drawer.openDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Image
            width={isMobileSize ? '105' : '140'}
            height={isMobileSize ? '24' : '32'}
            alt="icon"
            src={AppLogo}
          />
          <Box sx={{ flexGrow: 1 }} />
          {isLogin === false && unregisteredUserMenu}
        </Toolbar>
      </Grid>
    </AppBar>
  )
}

export default Header
