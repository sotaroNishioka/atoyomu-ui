import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  AppBar,
  Badge,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useDrawer from '../lib/hooks/useDrawer'
import useUser from '../lib/hooks/useUser'
import Drawer from './Drawer'

const Header = () => {
  // state
  const [isLogin, setIsLogin] = useState<boolean>(false)

  // context
  const user = useUser()
  const drawer = useDrawer()
  const router = useRouter()

  // effect
  useEffect(() => {
    if (user.user === null) {
      setIsLogin(false)
      return
    }
    if (user.user !== undefined) {
      setIsLogin(true)
    }
  }, [user.user])

  const onClickLogin = () => {
    router.push('/login')
  }

  const loginUserMenu = (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <IconButton size="large" aria-label="show 4 new mails" color="secondary">
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
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        onClick={onClickLogin}
        color="secondary"
        sx={{
          backgroundColor: 'secondary.light'
        }}
      >
        <Typography
          sx={{
            fontWeight: '600',
            color: 'secondary.main'
          }}
        >
          {'　'}
          ログイン
          {'　'}
        </Typography>
      </Button>
    </Box>
  )

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'secondary.main' }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar style={{ maxWidth: 1200, width: '100%' }}>
          {isLogin && (
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
          <img height="28px" alt="icon" src="/icon.svg" />
          <Box sx={{ flexGrow: 1 }} />
          {isLogin ? loginUserMenu : unregisteredUserMenu}
        </Toolbar>
      </Grid>
      <Drawer />
    </AppBar>
  )
}

export default Header
