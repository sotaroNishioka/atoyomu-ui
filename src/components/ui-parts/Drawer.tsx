import { MoveToInbox, Settings, SignpostOutlined } from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  Menu,
  MenuList,
  SwipeableDrawer as DrawerMUI
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'

const Drawer = () => {
  // init
  const auth = getAuth()
  const drawer = useDrawer()
  const { drawerWidth, headerHight, isMobileSize } = useSize()

  // state
  const [settingAnchorEl, setSettingAnchorEl] = useState<null | HTMLElement>(
    null
  )

  const list = (
    <Box
      role="presentation"
      onClick={drawer.closeDrawer}
      onKeyDown={drawer.closeDrawer}
      sx={{ height: '100%', alignContent: 'space-between' }}
    >
      <List dense sx={{ height: '100%' }}>
        {['s', 's', 'Send email', 's', 's', 'Send email', 's'].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <MoveToInbox />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
        <Box
          sx={{
            bottom: 72,
            width: '100%',
            position: 'absolute'
          }}
        >
          <Divider />
          <ListItem
            button
            onClick={(event) => setSettingAnchorEl(event.currentTarget)}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="設定" />
          </ListItem>
          <Menu
            elevation={0}
            id="positioned-menu"
            anchorEl={settingAnchorEl}
            open={settingAnchorEl !== null}
            onClose={() => setSettingAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left'
            }}
            sx={{ color: 'red' }}
            MenuListProps={{ sx: { border: 1, borderColor: 'secondary.main' } }}
          >
            <MenuList dense sx={{ pt: 0, pb: 0 }}>
              <ListItem
                button
                onClick={() => {
                  auth.signOut()
                }}
              >
                <ListItemIcon>
                  <SignpostOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItem>
            </MenuList>
          </Menu>
        </Box>
      </List>
    </Box>
  )

  return (
    <DrawerMUI
      anchor="left"
      open={drawer.isOpen}
      onClose={drawer.closeDrawer}
      onOpen={drawer.openDrawer}
      variant={isMobileSize ? 'temporary' : 'permanent'}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth
        }
      }}
      PaperProps={{
        sx: {
          mt: `${headerHight + 1}px`,
          borderRight: 1,
          borderColor: 'secondary.main',
          height: '100%'
        }
      }}
      BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
    >
      {list}
    </DrawerMUI>
  )
}

export default Drawer
