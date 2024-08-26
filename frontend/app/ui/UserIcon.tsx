import React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import { Box } from '@mui/material'

export default function UserIcon() {
  return (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img src="https://placehold.jp/150x150.png" alt="" style={{ width: '100%', height: '100%' }} />
    </Box>
  )
}
