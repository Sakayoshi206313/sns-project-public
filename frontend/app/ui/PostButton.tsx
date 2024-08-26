import React from 'react'

import { Button } from '@mui/material'

interface PostButtonProps {
  onClick: () => void
  buttonWidth?: string | number // Optional prop for button width
  buttonMargin: string | number
}

export default function PostButton({ onClick, buttonWidth, buttonMargin }: PostButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#1A8CD8',
        borderRadius: 50,
        fontSize: 16,
        fontWeight: 'bold',
        width: buttonWidth,
        margin: buttonMargin,
      }}
      onClick={onClick}
    >
      ポストする
    </Button>
  )
}
