'use client'

import { useEffect, useState } from 'react'

// APIレスポンスの項目の型を定義（インターフェース）
interface ApiResponseItem {
  nickname: string
  name: string
  picture: string
  updated_at: string
  email: string
  email_verified: boolean
  sub: string
  sid: string
}

export default function Auth() {
  const [data, setData] = useState<ApiResponseItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me')
        const data: ApiResponseItem = await response.json()
        // setData(data);

        const saveResponse = await fetch('http://localhost:8000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            auth_id: data.sub,
            username: data.nickname,
            email: data.email,
            locale: '設定してください',
            birthday: '1990-01-01',
          }),
        })

        if (!saveResponse.ok) {
          throw new Error('Failed to save data')
        } else {
          console.log('Data saved successfully')
        }
      } catch (error) {
        // console.error('Error fetching or saving data:', error);
      }
    }

    fetchData()
  }, [])
}
