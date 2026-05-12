import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  const isLoggedIn = !!token
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnProfile = req.nextUrl.pathname.startsWith('/profile')

  if (isOnAdmin) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', req.nextUrl))
    if (token?.email !== 'nurillohxasanov@gmail.com') {
      return NextResponse.redirect(new URL('/profile', req.nextUrl))
    }
  }

  if (isOnProfile) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
}
