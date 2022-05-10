import { Theme, useMediaQuery } from '@mui/material'

const useSize = () => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  )

  const drawerWidth = 240

  const headerHight = isMobileSize ? 56 : 64

  return { isMobileSize, drawerWidth, headerHight }
}

export default useSize
