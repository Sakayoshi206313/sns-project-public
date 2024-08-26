'use client'

import React, { FC, useEffect, useState } from 'react'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { IconButton } from '@mui/material'
import { Button } from '@mui/material'

import { error } from 'console'
import { throwDeprecation } from 'process'

interface LikeButtonProps {
  post_id: number // LikeするPostID
  auth_id: string
  onLike: () => void // Likeが成功した時のコールバック
}

export const LikeButton: React.FC<LikeButtonProps> = ({ post_id, auth_id, onLike }) => {
  const [fav, setFav] = useState(false)
  const [likeId, setLikeId] = useState<number | null>(null)

  useEffect(() => {
    const fetchLikeId = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/likes?post_id=${post_id}&user_id${auth_id}`)
        if (response.ok) {
          const likeData = await response.json()
          if (likeData && likeData.length > 0) {
            setFav(false)
            setLikeId(likeData[0].like_id)
          }
        }
      } catch (error) {
        console.log('Error fetching like id', error)
      }
    }

    fetchLikeId()
  }, [post_id, auth_id])

  const handleLikeClick = async () => {
    setFav(!fav)

    if (!fav) {
      try {
        // Postsの情報を取得
        const response = await fetch(`http://localhost:8000/api/posts`)

        if (!response.ok) {
          throw new Error('Failed to fetch post data')
        }
        const post = await response.json()
        console.log('postData is:', post)

        const postData = {
          post_id: post_id,
          user_id: auth_id,
          is_like: !fav,
        }

        // Likeテーブルに挿入するAPIリクエスト
        const likeResponse = await fetch('http://localhost:8000/api/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })

        if (!likeResponse.ok) {
          throw new Error('Failed to create like')
        }

        const likeData = await likeResponse.json()
        console.log('Like Response:', likeData)

        // likeIdを保存
        setLikeId(likeData.like_id)

        //Likeが成功した時、親コンポーネントに通知
        onLike()
      } catch (error) {
        console.error('Error liking post:', error)
        alert('Error liking posts')
        // エラー時は、favを元に戻す
        setFav(!fav)
      }
    } else {
      // 削除処理
      try {
        if (likeId !== null) {
          const response = await fetch(`http://localhost:8000/api/likes/${likeId}`, {
            method: 'DELETE',
            headers: {
              'Contents-Type': 'application/json',
            },
          })
          if (!response.ok) {
            throw new Error('failed to delete like')
          }
          const data = await response.json()
          console.log('Like deleted :', data)

          // 親コンポーネントに渡す
          onLike()
        }
      } catch (error) {
        console.log('Error unlike post:', error)
        alert('Error unlike post')
      }
    }
  }

  return (
    <>
      <IconButton onClick={handleLikeClick}>{fav ? <FavoriteIcon color={'secondary'} /> : <FavoriteBorderIcon />}</IconButton>
    </>
  )
}
