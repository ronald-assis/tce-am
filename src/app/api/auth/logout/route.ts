import { NextRequest, NextResponse } from 'next/server'
import Cookies from 'js-cookie'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/tceam-bi/login', request.url)

  Cookies.remove('token')

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=20; httpOnly;`,
    },
  })
}
