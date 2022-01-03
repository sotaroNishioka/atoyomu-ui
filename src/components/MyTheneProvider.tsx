import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { ReactElement } from 'react'

export default function MyThemeProvider({
  children
}: {
  children: ReactElement<any, any>
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        light: '#808080'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#F6F8FA',
        main: '#808080',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00'
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
