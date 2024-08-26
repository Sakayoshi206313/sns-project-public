import { useState } from 'react'

import { Box, Grid } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import SideNav from '../profile/sidenav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [shouldFetchPosts, setShouldFetchPosts] = useState(false)
  return (
    <CssBaseline>
      <Grid container>
        <Grid item xs={3}>
          <SideNav shouldFetchPosts={shouldFetchPosts} setShouldFetchPosts={setShouldFetchPosts} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            overflowY: 'auto',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </CssBaseline>
  )
}
