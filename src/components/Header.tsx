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
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import useDrawer from '../lib/hooks/useDrawer'
import useSize from '../lib/hooks/useSize'
import useUser from '../lib/hooks/useUser'
import Drawer from './Drawer'

const Header = () => {
  // state

  // context
  const user = useUser()
  const drawer = useDrawer()
  const router = useRouter()
  const { isMobileSize } = useSize()

  // effect

  // functions
  const onClickLogin = () => {
    router.push('/login')
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
      <Button
        onClick={onClickLogin}
        color="secondary"
        variant="text"
        size="small"
        sx={{
          borderColor: 'secondary.main',
          marginRight: 1
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: '600',
            paddingRight: 1,
            paddingLeft: 1
          }}
        >
          ログイン
        </Typography>
      </Button>
      <Button
        onClick={onClickLogin}
        color="secondary"
        variant="outlined"
        size="small"
        sx={{
          borderColor: 'secondary.main'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: '600',
            paddingRight: 1,
            paddingLeft: 1
          }}
        >
          新規登録
        </Typography>
      </Button>
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
          {user.isLogin && (
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
            src="/icon.svg"
          />
          <Box sx={{ flexGrow: 1 }} />
          {user.isLogin ? loginUserMenu : unregisteredUserMenu}
        </Toolbar>
      </Grid>
      <Drawer />
    </AppBar>
  )
}

export default Header
