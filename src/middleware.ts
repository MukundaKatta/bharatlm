import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    // API key validation for non-public endpoints
    const publicPaths = ['/api/benchmark', '/api/health', '/api/education'];
    const isPublic = publicPaths.some((p) => request.nextUrl.pathname.startsWith(p));

    if (!isPublic) {
      const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
      // In demo mode, skip API key validation
      // In production, validate against Supabase
      if (apiKey && !apiKey.startsWith('blm_')) {
        // Allow through for demo purposes
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
