import MailIcon from '@mui/icons-material/Mail'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AppBar, Badge, Box, Grid, IconButton, Toolbar } from '@mui/material'
// import Divider from '@mui/material/Divider'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
import React, { useEffect, useState } from 'react'
import useDrawer from '../lib/hooks/useDrawer'
import useUser from '../lib/hooks/useUser'
import Drawer from './Drawer'

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  // const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false)
  const user = useUser()
  const drawer = useDrawer()

  useEffect(() => {
    if (user.user === null) {
      setIsLogin(false)
      return
    }
    if (user.user !== undefined) {
      setIsLogin(true)
    }
  }, [user.user])

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

  return (
    <AppBar
      position="fixed"
      style={{ background: '#FFFFFFCC', boxShadow: 'none' }}
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
