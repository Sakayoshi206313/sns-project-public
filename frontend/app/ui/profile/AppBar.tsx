import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import { useUserData } from '~/app/hooks/useUserData'

interface Props {
  window?: () => Window
  children: React.ReactElement
}

function ElevationScroll(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default function ElevateAppBar() {
  const { userData } = useUserData()

  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <Toolbar sx={{ width: '75%', ml: 'auto' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ArrowBackIcon onClick={handleBackClick} />
            </IconButton>
            <Typography variant="h6" component="div">
              {userData.map((item) => (
                <Box key={item.user_id}>{item.username}</Box>
              ))}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  )
}
