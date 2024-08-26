// ログインするときに必要なレイアウト
import { UserProvider } from '@auth0/nextjs-auth0/client'

import './ui/global.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
