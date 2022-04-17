/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import Header from '../components/ui-parts/Header'
import { LogOutButton } from '../features/Auth'

const Home: NextPage = () => (
  <div>
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
  </div>
)

export default Home
