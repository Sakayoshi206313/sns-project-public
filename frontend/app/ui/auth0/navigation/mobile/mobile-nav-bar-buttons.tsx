'use client'

import React from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'

import { LoginButton } from '~/app/ui/auth0/buttons/login-button'
import { LogoutButton } from '~/app/ui/auth0/buttons/logout-button'
import { SignupButton } from '~/app/ui/auth0/buttons/signup-button'

export const MobileNavBarButtons = () => {
  const { user } = useUser()

  return (
    <div className="mobile-nav-bar__buttons">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && <LogoutButton />}
    </div>
  )
}
