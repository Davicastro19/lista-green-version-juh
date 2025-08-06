import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { TOKEN } from './shared/constants/urls';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const response = NextResponse.next();
  const token = request.cookies.get(TOKEN);


  if (token) {

    if (pathname === '/login' || pathname === '/signup' || pathname === '/sobrenos') {
      return NextResponse.redirect(`${origin}/home`);
    }
  } else {


    const isPublicPage = pathname === '/sobrenos' || pathname.includes("teste") || pathname.includes('/lista/salva') || pathname.includes('/sharing') || pathname.includes('/explorar') || pathname.includes('/artigos') || pathname.includes('/member-field') || pathname === '/home' || pathname.includes('/home/negocios') || pathname.includes('/busca') || pathname.includes('/listas') || pathname === '/cadastro' || pathname.includes('forgot-password') || pathname.includes('reset-password') || pathname === '/login' || pathname === '/signup' || pathname === '/' || pathname.startsWith('/articles');
    if (!isPublicPage) {
      return NextResponse.redirect(origin);
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!api|static|\\.\\w+|_next|favicon\\.ico|72x72\\.png|images/.*).*)',
};
