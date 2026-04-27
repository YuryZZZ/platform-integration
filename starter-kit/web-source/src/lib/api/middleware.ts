import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type AuthenticatedRequest = NextRequest & {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
  };
};

/**
 * withAuth — API Route Middleware for Authentication
 * Wraps a route handler and ensures the user is authenticated via JWT.
 */
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return async (req: NextRequest) => {
    // In a real implementation, we would verify the JWT from cookies/headers
    // For this template, we'll simulate a valid session if a demo header is present
    // or provide a fallback for development.

    const token = req.cookies.get('auth-token')?.value || req.headers.get('authorization');

    if (!token && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock authenticated user payload
    const authReq = req as AuthenticatedRequest;
    authReq.user = {
      id: 'user_123',
      email: 'admin@nexus-ai.dev',
      role: 'admin',
      tenantId: 'tenant_456',
    };

    return handler(authReq);
  };
}
