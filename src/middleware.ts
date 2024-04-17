import { NextRequest, NextResponse } from 'next/server'
import { getUser } from './lib/user'
import { api } from './lib/api'
import { AxiosError } from 'axios'

export async function middleware(request: NextRequest) {
  const redirectURL = new URL('/tceam-bi/login', request.url)

  const token = request.cookies.get('token')?.value

  const user = getUser().id_usuario

  if (!token) {
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=; Path=/; max-age=20; httpOnly;`,
      },
    })
  }

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
          'Set-Cookie': `token=; Path=/; max-age=0`,
        },
      })
    }
  }
}

export const config = {
  matcher: '/tceam-bi/:path*',
}
