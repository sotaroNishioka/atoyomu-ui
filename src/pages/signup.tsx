/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { AppLogo } from '../common/static/images'
import SignUpForm from '../features/Auth/components/signUp/SignUpForm'
// import { SignUpForm } from '../features/Auth'

const SignUp: NextPage = () => (
  <Container>
    <Box
      sx={{
        mt: 8,
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Image width="300" height="75" alt="icon" src={AppLogo} />
      </Box>
      <SignUpForm />
    </Box>
  </Container>
)

export default SignUp
