import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Grid } from '@mui/material'

import PostButton from './PostButton'
import PostTextArea from './PostTextArea'
import UserIcon from './UserIcon'

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

interface HomePostProps {
  setShouldFetchPosts: (value: boolean) => void
}

export default function HomePost({ setShouldFetchPosts }: HomePostProps) {
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
      setPostText('') //テキストフォールドを空にする
      setShouldFetchPosts(true) //  PostListを更新するためのフラグ
    } catch (error: any) {
      console.error('Error:', error)
      alert('エラーが発生しました: ' + (error.message || JSON.stringify(error)))
    }
  }

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        mt: '20px',
        padding: '20px',
      }}
    >
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end', pr: '20px' }}>
        <UserIcon />
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <PostTextArea value={postText} onChange={handlePostChange} />
          {/* {tableData.length > 0 && <p style={{ color: 'white' }}>{tableData[0].username}</p>} */}
          <PostButton onClick={handlePostSubmit} buttonMargin={'0 0 0 auto'} />
        </Grid>
      </Grid>
    </Grid>
  )
}
