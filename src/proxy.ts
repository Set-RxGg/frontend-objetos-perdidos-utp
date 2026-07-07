import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register'];
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export function proxy(request: NextRequest) {
  if (useMocks) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
