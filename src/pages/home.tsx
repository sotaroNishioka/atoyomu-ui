/* eslint-disable react/button-has-type */
import { Button, Grid } from '@mui/material'
import type { NextPage } from 'next'
import useAuth from '../common/hooks/useAuth'
import Auth from '../components/functional/Auth'
import Header from '../components/ui-parts/Header'

const Home: NextPage = () => {
  const auth = useAuth()

  return (
    <Auth>
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
            <Button onClick={auth.logOut}>ろぐあうと</Button>
          </Grid>
        </Grid>
      </div>
    </Auth>
  )
}

export default Home
