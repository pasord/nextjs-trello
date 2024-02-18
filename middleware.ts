import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: ['/'], // yang
    // Routes that can always be accessed, and have
    // no authentication information
    // ignoredRoutes: ['/no-auth-in-this-route'],

    afterAuth(auth, req) {
        // 1.如果已登录，且是LandingPage，则重定向去阻止选择页或组织页。（但LandingPage如何去呢TODO）
        if (auth.userId && auth.isPublicRoute) {
            let path = "/select-org"
            if (auth.orgId) {
                path = `/organization/${auth.orgId}`
            }
            const orgSelection = new URL(path, req.url)
            return NextResponse.redirect(orgSelection)
        }
        // 2.如果没登录且不是访问LandingPage，则去SignIn
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url })
        }
        // 3.如果已登录，没有选择组织，且不是去选择组织的页面；则强制重定向到选择组织页面
        if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
            const orgSelection = new URL("/select-org", req.url)
            return NextResponse.redirect(orgSelection)
        }
    }
});

export const config = {
    // Protects all routes, including api/trpc.
    // See https://clerk.com/docs/references/nextjs/auth-middleware
    // for more information about configuring your Middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

/** Note: 
 * req.url that they just try to access.
 * req.nextUrl is an object. 和 req.url 同类
 * auth.userId is used to check loggin or not.
 * auth.orgId is used to check if an organization has been selected.
 * URL is running in a nodejs environment.
 * new URL(path, req.url) 是什么
 * 上面三个路由拦截规则，跟随作者的思路就好，当然页可以参考clerk。
 */
