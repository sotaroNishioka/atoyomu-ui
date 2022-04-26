/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { AppLogo } from '../common/static/images'
import { ResetPasswordForm } from '../features/Auth'

const ResetPassword: NextPage = () => (
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
        <Image width="300" height="75" src={AppLogo} />
      </Box>
      <ResetPasswordForm />
    </Box>
  </Container>
)

export default ResetPassword
