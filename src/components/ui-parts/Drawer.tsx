import { Mail, MoveToInbox } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer as DrawerMUI,
  List,
  ListItem
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'

const Drawer = () => {
  // init
  const drawer = useDrawer()
  const { drawerWidth, headerHight, isMobileSize } = useSize()

  const list = (
    <Box
      role="presentation"
      onClick={drawer.closeDrawer}
      onKeyDown={drawer.closeDrawer}
    >
      <List>
        {['s', 's', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <MoveToInbox />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <DrawerMUI
      anchor="left"
      open={drawer.isOpen}
      onClose={drawer.closeDrawer}
      elevation={0}
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
          borderColor: 'secondary.main'
        }
      }}
      BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
    >
      {list}
    </DrawerMUI>
  )
}

export default Drawer
