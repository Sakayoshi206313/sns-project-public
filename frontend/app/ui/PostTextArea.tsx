'use client';

import React, { useState } from 'react';



import { TextField } from '@mui/material'

interface PostTextAreaProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function PostTextArea({ value, onChange }: PostTextAreaProps) {
  // const [postText, setPostText] = useState('')

  // const handlePostChange = (event) => {
  //   setPostText(event.target.value)
  // }

  return (
    <TextField
      placeholder="いまどうしてる？"
      value={value}
      onChange={onChange}
      multiline
      rows={4}
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          padding: '10px',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
            // borderBottom: '0.5px solid #fff',
            // borderRadius: 0,
          },
        },
        '& .MuiInputBase-input': {
          color: '#71767B',
          fontSize: '20px',
          backgroundColor: 'transparent',
          width: '100%',
          border: '0',
          resize: 'none',
          outline: 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        },
      }}
    />
  )
}