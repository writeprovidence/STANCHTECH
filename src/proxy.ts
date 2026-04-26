import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', 
  '/login(.*)', 
  '/signup(.*)',
  '/shop(.*)', 
  '/contact(.*)', 
  '/about(.*)',
  '/api/(.*)',
  '/cart',
  '/checkout',
  '/asset(.*)',
  '/fonts(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/',
    // Skip Next.js internals and all static files
    '/((?!_next|static|asset|fonts|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
