import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Allow localhost for development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next()
  }
  
  // Allow only the authorized domain
  const allowedDomains = [
    'ashwini-paglu1.vercel.app',
    // Add any other allowed domains here
  ]
  
  const isAllowed = allowedDomains.some(domain => hostname.includes(domain))
  
  if (!isAllowed) {
    // Return 404 for unauthorized domains
    return new NextResponse('404 - Page Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
