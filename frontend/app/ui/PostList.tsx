'use client'

import React, { useEffect, useState } from 'react'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Container, CssBaseline, Fade, Grid, IconButton, Menu, MenuItem, Paper } from '@mui/material'
import axios from 'axios'

import { Console } from 'console'
import Link from 'next/link'

import { usePosts } from '../hooks/usePosts'
import { useUserData } from '../hooks/useUserData'
import { LikeButton } from './Like/LikeButton'

interface PostListProps {
  shouldFetchPosts: boolean
  setShouldFetchPosts: (value: boolean) => void
}

export default function PostList({ shouldFetchPosts, setShouldFetchPosts }: PostListProps) {
  const { posts, fetchPosts } = usePosts()
  const { userData, isLoading, error } = useUserData()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedPostId, setSelectedPostId] = React.useState<null | number>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>, post: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedPostId(post.post_id)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
      fetchPosts().then(() => setShouldFetchPosts(false))
    }
  }, [shouldFetchPosts, fetchPosts])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading user data</div>

  // 現在のユーザー情報を取得
  const currentUser = userData.length > 0 ? userData[0] : null

  // デバッグ用ログ出力
  // if (currentUser) {
  //   console.log('userData[0].auth_id:', currentUser.auth_id)
  //   console.log('Type of userData[0].auth_id:', typeof currentUser.auth_id)
  // }

  return (
    <>
      {/* <ScopedCssBaseline> */}
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {posts
          .slice()
          .reverse()
          .map((post) => {
            // エラー
            // console.log('post:', post)
            // console.log('post.user_id:', post.user_id)
            // console.log('Type of post.user_id:', typeof post.user_id)
            const handleLikeClick = () => {
              console.log(post)
            }
            return (
              <div key={post.post_id} style={{ display: 'flex', width: '100%', padding: '20px' }}>
                <div
                  style={{
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'end',
                    paddingRight: '20px',
                  }}
                >
                  <img src="https://placehold.jp/150x150.png" alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </div>
                <div
                  style={{
                    marginLeft: '10px',
                    width: '75%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {/* ここを変える */}
                      <Link href={`/profile/${post.auth_id}`}>{post.username}</Link>
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '14px',
                        }}
                      >
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                      {/* <IconButton onClick={handleClick} aria-label="more options"> */}
                      {currentUser && currentUser.auth_id === post.auth_id && (
                        <>
                          <IconButton
                            aria-label="more options"
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event) => handleClick(event, post)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id="fade-menu"
                            MenuListProps={{
                              'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            PaperProps={{
                              style: {
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 12px', // 影を薄めるスタイル
                              },
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                if (window.confirm('本当にこの投稿を削除しますか？')) {
                                  handleDelete()
                                }
                              }}
                            >
                              削除
                            </MenuItem>
                          </Menu>
                        </>
                      )}
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    {post.post_text}
                  </p>
                  <p>
                    <LikeButton post_id={post.post_id} auth_id={post.auth_id} onLike={handleLikeClick} />
                  </p>
                </div>
              </div>
            )
          })}
      </Grid>
      {/* </ScopedCssBaseline> */}
    </>
  )
}
