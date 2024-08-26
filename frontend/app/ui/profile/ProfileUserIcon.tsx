import React, { ChangeEvent, useState } from 'react'

import { Avatar, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from '@mui/material'
import Button from '@mui/material/Button'

export default function ProfileUserIcon() {
  const [open, setOpen] = useState(false)
  const [imageiconData, setImageiconData] = useState<string | ArrayBuffer | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleImageiconChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageiconData(reader.result)
      }
      reader.readAsDataURL(file)
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile) {
      alert('画像ファイルを選択してください。')
      return
    }
    const formData = new FormData()
    formData.append('auth_id', 'auth0|666eef9fa87969053a88d1e0')
    formData.append('imageicon_data', selectedFile)

    console.log('auth_id', formData.get('auth_id'))

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PUT',
        body: formData,
      })
      if (response.ok) {
        alert('成功しました！')
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData) // エラーログを追加
        alert('アップロードに失敗しました: ' + JSON.stringify(errorData))
      }
    } catch (error: any) {
      console.error('Catch error:', error) // エラーログを追加
      alert('エラーが発生しました: ' + error.message)
    }
  }

  return (
    <CssBaseline>
      <IconButton
        variant="outlined"
        onClick={handleClickOpen}
        color="inherit"
        aria-label="open drawer"
        edge="end"
        sx={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <img src="https://placehold.jp/150x150.png" alt="" style={{ width: '100%', height: '100%' }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ width: '100%' }}>
          <DialogContentText>ユーザーアイコン</DialogContentText>
          <input type="file" accept="image/*" onChange={handleImageiconChange} />
          {imageiconData && <Avatar sx={{ float: 'left' }} src={imageiconData as string} alt="Image Icon" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button variant="contained" disableElevation onClick={handleSubmit}>
            変更する
          </Button>
        </DialogActions>
      </Dialog>
    </CssBaseline>
  )
}
