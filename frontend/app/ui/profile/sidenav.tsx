import React, { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, IconButton, ListItemIcon, Modal } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import Post from '../PostModal'
import { LogoutButton } from '../auth0/buttons/logout-button'

const links = [
  { name: 'Home', href: '/home' },
  { name: 'Profile', href: '/profile' },
]

const post = { name: 'ポストする', href: '/compose/post' }

export default function SideNav({ shouldFetchPosts, setShouldFetchPosts }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setShouldFetchPosts(true)
  }

  const drawer = (
    <CssBaseline>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid direction="column" item xs={6}>
          <List>
            {links.map((link) => (
              <ListItem key={link.name} disablePadding>
                <ListItemButton component="a" href={link.href} sx={{ '&:hover': { borderRadius: '40px' } }}>
                  <ListItemIcon>
                    {link.name === 'Home' && <HomeIcon />}
                    {link.name === 'Profile' && <PersonIcon />}
                  </ListItemIcon>
                  <ListItemText primary={link.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem disablePadding>
              <Fab variant="extended" color="primary" onClick={handleOpen} sx={{ fontWeight: 'bold', width: '80%' }}>
                {post.name}
              </Fab>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <LogoutButton />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </CssBaseline>
  )

  return (
    <>
      <Drawer
        sx={{
          width: '100%',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '25%',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {drawer}
      </Drawer>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Post onClose={handleClose} setShouldFetchPosts={setShouldFetchPosts} />
      </Modal>
    </>
  )
}
