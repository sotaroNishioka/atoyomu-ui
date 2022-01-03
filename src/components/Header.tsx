import MailIcon from '@mui/icons-material/Mail'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AppBar, Badge, Box, Grid, IconButton, Toolbar } from '@mui/material'
// import Divider from '@mui/material/Divider'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
import React, { useEffect, useState } from 'react'
import useUser from '../lib/useUser'

function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  // const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false)
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

  // const list = (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     onClick={() => setIsShowDrawer(false)}
  //     onKeyDown={() => setIsShowDrawer(false)}
  //   >
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // )

  const userMenu = (
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
      <Toolbar style={{ maxWidth: 1200 }}>
        <Grid>
          {/* <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={() => setIsShowDrawer(true)}
        >
          <MenuIcon />
        </IconButton> */}
          <img height="28px" alt="icon" src="/icon.svg" />
          <Box sx={{ flexGrow: 1 }} />
          {isLogin && userMenu}
        </Grid>
      </Toolbar>
      {/* <Drawer
        variant="persistent"
        anchor="left"
        open={isShowDrawer}
        onClose={() => setIsShowDrawer(false)}
      >
        {list}
      </Drawer> */}
    </AppBar>
  )
}

export default Header
