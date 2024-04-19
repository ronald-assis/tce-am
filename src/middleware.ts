import { NextRequest, NextResponse } from 'next/server'
import { AxiosError } from 'axios'

import { getUser } from './lib/user'
import { api } from './lib/api'

export async function middleware(request: NextRequest) {
  const redirectURL = new URL('/tceam-bi/login', request.url)

  const user = getUser().id_usuario

  try {
    const response = await api.get(`/usuario/${user}`)
    if (response) {
      return NextResponse.next()
    }
  } catch (e) {
    const error = e as AxiosError | Error
    if (error instanceof AxiosError) {
      console.error(error.response)
      return NextResponse.redirect(redirectURL, {
        headers: {
          'Set-Cookie': `token=; Path=/; max-age=20; httpOnly;`,
        },
      })
    }
  }
}

export const config = {
  matcher: '/tceam-bi/:path*',
}
