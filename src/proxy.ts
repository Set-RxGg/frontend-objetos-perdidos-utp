import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register'];
const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export function proxy(request: NextRequest) {
  if (useMocks) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const cookieName = useMocks ? 'mock_auth' : 'access_token';
  const sessionToken = request.cookies.get(cookieName)?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!sessionToken && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
