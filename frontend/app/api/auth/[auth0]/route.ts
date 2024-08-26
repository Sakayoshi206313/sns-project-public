import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/home',
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: 'signup',
    },
    returnTo: '/home',
  }),
})

// generateStaticParams 関数を追加
export async function generateStaticParams() {
  return [{ auth0: 'login' }, { auth0: 'signup' }, { auth0: 'callback' }, { auth0: 'logout' }, { auth0: 'me' }]
}
