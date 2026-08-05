import { NextResponse, type NextRequest } from 'next/server';

const CARETAKER_PATH = /^\/care-taker(\/|$)/;
const PATIENT_PATH = /^\/patient(\/|$)/;
const PUBLIC_PATHS = ['/login', '/register', '/'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;
  const role = request.cookies.get('user_role')?.value as 'caretaker' | 'patient' | undefined;
  const isAuthenticated = Boolean(accessToken);

  if (PUBLIC_PATHS.includes(pathname)) {
    if (isAuthenticated && role) {
      const destination = role === 'caretaker' ? '/care-taker/dashboard' : '/patient/dashboard';
      return NextResponse.redirect(new URL(destination, request.url));
    }

    return NextResponse.next();
  }

  if (CARETAKER_PATH.test(pathname)) {
    if (!isAuthenticated || role !== 'caretaker') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  if (PATIENT_PATH.test(pathname)) {
    if (!isAuthenticated || role !== 'patient') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/care-taker/:path*', '/patient/:path*', '/login', '/register', '/'],
};
