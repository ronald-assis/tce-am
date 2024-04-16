import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const redirectURL = new URL('/tceam-bi/login', request.url)

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=; Path=/; max-age=20; httpOnly;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/tceam-bi/login',
}
