import { ExitToApp, MoveToInbox, Settings } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer as DrawerMUI,
  List,
  ListItem,
  Menu,
  MenuList
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'
import useAuth from '../../common/hooks/useAuth'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'

const Drawer = () => {
  // init
  const auth = useAuth()
  const drawer = useDrawer()
  const { drawerWidth, headerHight, isMobileSize } = useSize()

  // state
  const [settingAnchorEl, setSettingAnchorEl] = useState<null | HTMLElement>(
    null
  )

  const list = (
    <Box
      role="presentation"
      sx={{ height: '100%', alignContent: 'space-between' }}
    >
      <List dense sx={{ height: '100%', pt: 0, pb: 0 }}>
        {[
          'ssss',
          'sdddd',
          'Send fffemail',
          'sgggg',
          'shhhh',
          'Sendjjjj email',
          'kkkkks'
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <MoveToInbox />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Box
          sx={{
            bottom: isMobileSize ? 57 : 65,
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
            onClose={() => {
              drawer.closeDrawer()
              setSettingAnchorEl(null)
            }}
            transitionDuration={0}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            MenuListProps={{
              sx: {
                border: 1,
                borderColor: 'secondary.main',
                pt: 0,
                pb: 0
              }
            }}
          >
            <MenuList dense sx={{ pt: 0, pb: 0 }}>
              <ListItem button onClick={auth.signOut}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
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
      elevation={0}
      transitionDuration={0}
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
