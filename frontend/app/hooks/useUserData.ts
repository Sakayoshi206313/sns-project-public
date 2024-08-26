import { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'

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

export const useUserData = () => {
  const [userData, setUserData] = useState<BackendUserData[]>([])
  const { user, error, isLoading } = useUser()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data: BackendUserData[] = await response.json()
        const filteredData = data.filter((item) => item.auth_id === user.sub)
        setUserData(filteredData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [user])

  return { userData, error, isLoading }
}
