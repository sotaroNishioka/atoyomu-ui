import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AppBar, Badge, Box, Grid, IconButton, Toolbar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'
import { AppLogo } from '../../common/static/images'
import OutLinedButton from '../ui-elements/OutLinedButton'
import TextButton from '../ui-elements/TextButton'
import Drawer from './Drawer'

const Header = () => {
  // init
  const auth = getAuth()

  // state

  // context
  const drawer = useDrawer()
  const router = useRouter()
  const { isMobileSize } = useSize()

  // effect

  // functions
  const onClickLogin = () => {
    router.push('/login')
  }
  const onClickSignUp = () => {
    router.push('/signup')
  }

  const loginUserMenu = (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <IconButton
        size="large"
        aria-label="show 4 new mails"
        // color="secondary.light"
      >
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="secondary"
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Box>
  )
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
      position="absolute"
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
          {auth.currentUser !== null && (
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="open drawer"
              sx={{ mr: 2 }}
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
          {auth.currentUser !== null ? loginUserMenu : unregisteredUserMenu}
        </Toolbar>
      </Grid>
      <Drawer />
    </AppBar>
  )
}

export default Header
