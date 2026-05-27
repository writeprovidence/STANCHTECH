import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', 
  '/login(.*)', 
  '/signup(.*)',
  '/spares(.*)', 
  '/contact(.*)', 
  '/about(.*)',
  '/projects(.*)',
  '/admin(.*)',
  '/api/(.*)',
  '/asset(.*)',
  '/fonts(.*)',
  '/privacy(.*)',
  '/return-policy(.*)',
  '/terms(.*)'
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
