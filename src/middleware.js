
import { NextResponse } from 'next/server'

export function middleware(request) {


  

    
    const token = request.cookies.get('token')?.value

    // If no token found, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }


  

  return NextResponse.next()
}

export const config = {
  matcher: [ '/dashboard', '/profile'], 
}