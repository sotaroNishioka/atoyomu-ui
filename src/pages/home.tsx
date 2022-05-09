/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import AuthRoute from '../components/ui-parts/AuthRoute'
import Header from '../components/ui-parts/Header'
import { LogOutButton } from '../features/Auth'

const Home: NextPage = () => (
  <AuthRoute>
    <>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '200vh' }}
      >
        <Grid item xs={6}>
          <LogOutButton />
        </Grid>
      </Grid>
    </>
  </AuthRoute>
)

export default Home
