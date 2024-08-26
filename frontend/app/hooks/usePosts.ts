import { useEffect, useState } from 'react'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts')
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('通信に失敗しました:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, fetchPosts }
}
