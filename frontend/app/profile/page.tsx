'use client'

import React, { useEffect, useState } from 'react'

import CakeIcon from '@mui/icons-material/Cake'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, Container, Grid, IconButton, Typography } from '@mui/material'

import { usePostData } from '../../app/hooks/Posthook'
import { useUserData } from '../hooks/useUserData'
import RootLayout from '../ui/Layouts/Layout'
import SettingButton from '../ui/SettingButton'
import ElevateAppBar from '../ui/profile/AppBar'
import ProfileUserIcon from '../ui/profile/ProfileUserIcon'
import Auth from './auth'

// interface PostListProps {
//   shouldFetchPosts: boolean
//   setShouldFetchPosts: (value: boolean) => void
// }

export default function Profile() {
  const [shouldFetchPosts, setShouldFetchPosts] = useState(false)
  const { userData, isLoading, error } = useUserData()
  const { postData, fetchPostData } = usePostData()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedPostId, setSelectedPostId] = React.useState<null | number>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>, post: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedPostId(post.post_id)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedPostId(null)
  }
  const handleDelete = async () => {
    if (selectedPostId !== null) {
      try {
        console.log('Deleting post with ID:', selectedPostId) // デバッグ用ログ
        const response = await fetch(`http://localhost:8000/api/posts/${selectedPostId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`削除に失敗しました: ${response.statusText}`)
        }

        console.log('Post deleted successfully') // デバッグ用ログ
        setShouldFetchPosts(true)
      } catch (error) {
        console.error('投稿の削除中にエラーが発生しました:', error)
      }
    }
    setAnchorEl(null)
  }

  useEffect(() => {
    if (shouldFetchPosts) {
      console.log('Fetching posts...') // デバッグ用ログ
      fetchPostData().then(() => {
        console.log('Posts fetched successfully') // デバッグ用ログ
        setShouldFetchPosts(false)
      })
    }
  }, [shouldFetchPosts, fetchPostData])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user data</div>

  // 現在のユーザー情報を取得
  const currentUser = userData.length > 0 ? userData[0] : null

  return (
    <RootLayout>
      <Box>
        {userData.map((item) => (
          <Box key={item.user_id} sx={{ borderRight: '1px solid black', height: '100%' }}>
            <ElevateAppBar />
            <Container sx={{ padding: 0, marginLeft: 0, '@media (min-width: 600px)': { paddingLeft: 0, paddingRight: 0 } }}>
              <Box sx={{ position: 'relative', height: 325 }}>
                <Box sx={{ height: 250 }}>
                  <img src="https://placehold.jp/960x250.png" alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, marginLeft: 2.5 }}>
                  <ProfileUserIcon />
                </Box>
              </Box>
              <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight="bold">
                    {item.username}
                  </Typography>
                  <SettingButton />
                </Box>
                <Typography sx={{ ml: 2.5 }}>{item.email}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FmdGoodIcon sx={{ ml: 2.5 }} />
                  <Typography sx={{ ml: 1.5 }}>{item.locale}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CakeIcon sx={{ ml: 2.5 }} />
                  <Typography sx={{ ml: 1.5 }}>{item.birthday}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2.5 }}>
                  <Box sx={{ ml: 2.5 }}>
                    <a href="">follow</a>
                  </Box>
                  <Box sx={{ ml: 2.5 }}>
                    <a href="">follower</a>
                  </Box>
                </Box>
              </Container>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  mt: 2,
                }}
              >
                {postData
                  .slice()
                  .reverse()
                  .map((post) => (
                    <Box key={post.post_id} sx={{ display: 'flex', width: '100%', p: 2 }}>
                      <Box
                        sx={{
                          width: '25%',
                          display: 'flex',
                          justifyContent: 'end',
                          pr: 2,
                        }}
                      >
                        <img src="https://placehold.jp/150x150.png" alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                      </Box>
                      <Box sx={{ ml: 1, width: '75%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Typography sx={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>{post.username}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ margin: 0, fontSize: '14px' }}>{new Date(post.created_at).toLocaleString()}</Typography>
                            <IconButton aria-label="more options">
                              <MoreHorizIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography sx={{ margin: 0 }}>{post.post_text}</Typography>
                      </Box>
                    </Box>
                  ))}
              </Grid>
            </Container>
          </Box>
        ))}
        <Auth />
      </Box>
    </RootLayout>
  )
}
