import { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'

interface BackendPostData {
  post_id: number
  auth_id: string
  username: string
  post_text: string
  created_at: Date
}

export const usePostData = () => {
  const [postData, setPostData] = useState<BackendPostData[]>([])
  const { user, error, isLoading } = useUser()

  const fetchPostData = async () => {
    if (!user) return // userが取得されるまで待つ
    try {
      const response = await fetch('http://localhost:8000/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const postData: BackendPostData[] = await response.json()
      const filteredData = postData.filter((item) => item.auth_id === user?.sub)
      setPostData(filteredData)
      // console.log('取得したテーブルデータ:', filteredData)
    } catch (error) {
      console.error('テーブルデータの取得エラー:', error)
    }
  }

  useEffect(() => {
    fetchPostData()
  }, [user])

  return { postData, fetchPostData, error, isLoading }
}
