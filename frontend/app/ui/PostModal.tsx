'use client'

import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, IconButton, TextField } from '@mui/material'

import PostButton from '~/app/ui/PostButton'
// import PostMenuLink from '~/app/ui/PostMenuLink'
import PostTextArea from '~/app/ui/PostTextArea'
import UserIcon from '~/app/ui/UserIcon'

// import styles from '../../ui/Button.module.css'

interface BackendUserData {
  user_id: number
  username: string
  auth_id: string
  email: string
  locale: string
  gender: string
  profile: string
  birthday: string
}

interface PostProps {
  onClose: () => void
  setShouldFetchPosts: (value: boolean) => void // ページを更新するための関数を追加
}

export default function Post({ onClose, setShouldFetchPosts }: PostProps) {
  const [tableData, setTableData] = useState<BackendUserData[]>([])
  const { user, error, isLoading } = useUser()
  const [postText, setPostText] = useState('')

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user')
        const tableData: BackendUserData[] = await response.json()

        const filteredData = tableData.filter((item) => item.auth_id === user?.sub)
        setTableData(filteredData)
      } catch (error) {
        console.error('テーブルデータの取得エラー:', error)
      }
    }

    if (user) {
      fetchTableData()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      setPostText(user.locale || '')
    }
  }, [user])

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value)
  }

  const handlePostSubmit = async () => {
    if (!user) return

    const postData = {
      auth_id: user.sub,
      username: tableData[0].username,
      post_text: postText,
    }

    // 非同期操作を試行し、エラーが発生した場合はcatchブロックで処理
    try {
      console.log('Sending POST request to API...')
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.log('Error response:', errorData)
        throw new Error(errorData.error || 'Network response was not ok')
      }

      const data = await response.json()
      console.log('Success:', data)
      alert('投稿されました！')
      setPostText('') // PostTextAreaを空にする
      onClose() // モーダルを閉じる
      setShouldFetchPosts(true) // ページを更新する
    } catch (error: any) {
      console.error('Error:', error)
      alert('エラーが発生しました: ' + (error.message || JSON.stringify(error)))
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        width: '568px',
        borderRadius: '20px',
        my: '50px',
        mx: 'auto',
      }}
    >
      <IconButton onClick={onClose}>
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
      <Grid container sx={{ px: '20px', pb: '20px' }}>
        <Grid item xs={2}>
          <UserIcon />
        </Grid>
        <Grid item xs={10}>
          <PostTextArea value={postText} onChange={handlePostChange} />
          {/* {tableData.length > 0 && <p style={{ color: 'white' }}>{tableData[0].username}</p>} */}
          <Grid sx={{ display: 'flex' }}>
            <PostButton onClick={handlePostSubmit} buttonMargin={'0 0 0 auto'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
