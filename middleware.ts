// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Return early - no middleware logic for now
  return NextResponse.next();
}

export const config = {
  matcher: [], // Empty matcher - disable middleware
};