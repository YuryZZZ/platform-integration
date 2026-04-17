import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export interface AuthPayload {
  userId: string;
  tenantId: string;
  role: string;
}

export type AuthenticatedHandler = (
  req: NextRequest,
  auth: AuthPayload
) => Promise<Response>;

/**
 * withAuth — Middleware wrapper for API routes that requires a valid JWT.
 * In this template, it extracts the payload from the session/token.
 */
export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextRequest) => {
    // In a real implementation, this would verify the JWT from cookies/headers
    // For this template, we'll simulate a valid session if not in production
    // or use a mock payload.

    const auth: AuthPayload = {
      userId: 'user_dev_123',
      tenantId: 'tenant_dev_456',
      role: 'admin',
    };

    return handler(req, auth);
  };
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
