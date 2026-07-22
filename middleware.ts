import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLocked = process.env.MAINTENANCE_MODE === 'true';
  
  if (isLocked) {
    const token = request.nextUrl.searchParams.get('access_token');
    if (token === process.env.SECRET_ACCESS_TOKEN) {
      return NextResponse.next();
    }
    return new NextResponse('Закрыто на обслуживание', { status: 503 });
  }
  return NextResponse.next();
}

export const config = { matcher: '/((?!_next/static|favicon.ico).*)' };