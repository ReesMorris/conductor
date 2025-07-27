import { route } from '@/utils/route';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Health check middleware that responds to /health requests
 * Returns a 200 OK with basic app information
 */
export const health = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === route('HEALTH_CHECK')) {
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'conductor-panel',
        version: process.env.npm_package_version || 'unknown'
      },
      { status: 200 }
    );
  }

  return null;
};
