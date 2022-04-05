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

const Drawer = () => {
  const drawer = useDrawer()

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={drawer.closeDrawer}
      onKeyDown={drawer.closeDrawer}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
      PaperProps={{
        sx: {
          borderRight: 1,
          borderRightColor: 'secondary.main'
        }
      }}
      anchor="left"
      elevation={0}
      open={drawer.isOpen}
      onClose={drawer.closeDrawer}
      BackdropProps={{ style: { backgroundColor: 'transparent' } }}
    >
      {list}
    </DrawerMUI>
  )
}

export default Drawer
