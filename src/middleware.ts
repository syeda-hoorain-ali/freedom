import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";


export const middleware = async (request: NextRequest) => {
    const token = await getToken({ req: request });
    const path = request.nextUrl.pathname;   


    if (!token) {
        if (path.startsWith('/cart') || path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }
    }
    
    if (token) {
        if(path.startsWith('/sign-in') || path.startsWith('/sign-up')) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        const isAdmin = token.isAdmin;
        if(!isAdmin && path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        if(path === '/admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }


    return NextResponse.next()
}


export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/cart',
        '/admin/:path*'
    ]
}
