import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import useUser from '../lib/useUser'

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const user = useUser()

  useEffect(() => {
    if (user.currentUser === null) {
      setIsLogin(false)
      return
    }
    if (user.currentUser !== undefined) {
      setIsLogin(true)
    }
  }, [user.currentUser])

  return (
    <AppBar
      position="fixed"
      style={{ background: '#FFFFFFCC', boxShadow: 'none' }}
      elevation={0}
      sx={{ borderBottom: 2, borderColor: 'secondary.light' }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <img height="28px" alt="icon" src="/icon.svg" />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
