'use client'

import React from 'react'
import { useEffect, useState } from 'react'

import CakeIcon from '@mui/icons-material/Cake'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, Container, Grid, IconButton, Typography } from '@mui/material'

import RootLayout from '../../ui/Layouts/Layout'
import SettingButton from '../../ui/SettingButton'
import ElevateAppBar from '../../ui/profile/AppBar'
import ProfileUserIcon from '../../ui/profile/ProfileUserIcon'

interface BackendUserData {
  user_id: number
  username: string
  auth_id: string
  email: string
  locale: string
  gender: string
  profile: string
  birthday: string
  imageiconData: string
}

interface BackendPostData {
  post_id: number
  auth_id: string
  username: string
  post_text: string
  created_at: Date
}

export default function Profile({ params }: { params: { auth_id: string } }) {
  const [userData, setUserData] = useState<BackendUserData[]>([])
  const [postData, setPostData] = useState<BackendPostData[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user')

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        // console.log(response)

        const data: BackendUserData[] = await response.json()
        // console.log(data)
        console.log(params.auth_id)
        data.forEach((item) => {
          console.log(item.auth_id)
        })

        const decodedAuthId = decodeURIComponent(params.auth_id)
        console.log(decodedAuthId)

        const filteredData = data.filter((item) => item.auth_id === decodeURIComponent(params.auth_id))
        console.log(filteredData) //ここが取得できていない
        setUserData(filteredData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [params.auth_id])

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const postData: BackendPostData[] = await response.json()
        const filteredData = postData.filter((item) => item.auth_id === decodeURIComponent(params.auth_id))
        setPostData(filteredData)
        console.log('取得したテーブルデータ:', filteredData)
      } catch (error) {
        console.error('テーブルデータの取得エラー:', error)
      }
    }
    fetchPostData()
  }, [params.auth_id])

  return (
    <RootLayout>
      <h1>{params.auth_id}</h1>
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
      </Box>
    </RootLayout>
  )
}
