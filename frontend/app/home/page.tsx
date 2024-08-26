'use client'

import React, { useState } from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import { Box, Button, Grid, TextField } from '@mui/material'

import HomePost from '../ui/HomePost'
import RootLayout from '../ui/Layouts/Layout'
import PostButton from '../ui/PostButton'
import PostList from '../ui/PostList'
import PostTextArea from '../ui/PostTextArea'
import UserIcon from '../ui/UserIcon'

export default function home() {
  const [shouldFetchPosts, setShouldFetchPosts] = useState(false)
  return (
    <RootLayout>
      <HomePost setShouldFetchPosts={setShouldFetchPosts} />
      <PostList shouldFetchPosts={shouldFetchPosts} setShouldFetchPosts={setShouldFetchPosts} />
    </RootLayout>
  )
}
