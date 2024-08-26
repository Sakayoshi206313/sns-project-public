import React, { useEffect, useState } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'

import { useUserData } from '../hooks/useUserData'

export default function SettingButton() {
  const [open, setOpen] = useState(false)
  const { user, error, isLoading } = useUser()
  const [username, setUsername] = useState('')
  const [locale, setLocale] = useState('')
  const [gender, setGender] = useState('')
  const [profile, setProfile] = useState('')
  const [birthday, setBirthday] = useState('')
  const [imageiconData, setimageiconData] = useState('')
  const { userData } = useUserData()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (userData && userData.length > 0) {
      const user = userData[0]
      setUsername(user.username || '')
      setLocale(user.locale || '')
      setGender(user.gender || '')
      setProfile(user.profile || '')
      setBirthday(user.birthday || '')
      setimageiconData(user.imageiconData || '')
    }
  }, [userData])

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocale(event.target.value)
  }

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value)
  }

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(event.target.value)
  }

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(event.target.value)
  }

  const handleImageiconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setimageiconData(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePostSubmit = async () => {
    if (!user) return

    const profileData = {
      auth_id: user.sub,
      username,
      email: user.email,
      locale,
      gender,
      profile,
      birthday,
      imageiconData,
    }

    try {
      console.log('Sending Profile request to API...')
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.log('Error response:', errorData)
        throw new Error(errorData.error || 'Network response was not ok')
      }

      const data = await response.json()
      console.log('Success:', data)
      alert('変更されました！')
    } catch (error: any) {
      console.error('Error:', error)
      alert('エラーが発生しました: ' + error.message)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <CssBaseline>
      <Button variant="outlined" onClick={handleClickOpen}>
        プロフィール編集
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Setting</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <DialogContentText>username</DialogContentText>
          <TextField sx={{ width: 500 }} variant="standard" margin="dense" placeholder="ユーザーネーム" value={username} onChange={handleUsernameChange} />
          <DialogContentText>locale</DialogContentText>
          <TextField sx={{ width: 500 }} variant="standard" margin="dense" placeholder="出身地" value={locale} onChange={handleLocaleChange} />
          <DialogContentText>gender</DialogContentText>
          <TextField sx={{ width: 500 }} variant="standard" margin="dense" placeholder="性別" value={gender} onChange={handleGenderChange} />
          <DialogContentText>profile</DialogContentText>
          <TextField sx={{ width: 500 }} variant="standard" margin="dense" placeholder="自己紹介" value={profile} onChange={handleProfileChange} />
          <DialogContentText>birthday</DialogContentText>
          <TextField sx={{ width: 500 }} variant="standard" margin="dense" placeholder="誕生日" value={birthday} onChange={handleBirthdayChange} />
          <DialogContentText>ユーザーアイコン</DialogContentText>
          <input type="file" accept="image/*" onChange={handleImageiconChange} />
          {imageiconData && <Avatar sx={{ float: 'left' }} src={imageiconData} alt="Image Icon" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" disableElevation onClick={handlePostSubmit}>
            変更する
          </Button>
        </DialogActions>
      </Dialog>
    </CssBaseline>
  )
}
