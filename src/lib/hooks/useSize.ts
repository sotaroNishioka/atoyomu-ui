import { Theme, useMediaQuery } from '@mui/material'

const useSize = () => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  )
  return { isMobileSize }
}

export default useSize
