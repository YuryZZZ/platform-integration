/**
 * Edge Detection Module
 * Server-side surface detection from User-Agent
 */

import { SurfaceType } from './types';

/**
 * Detects surface type from User-Agent string
 * This is a conservative initial guess only
 */
export function detectSurfaceFromUA(userAgent: string): SurfaceType {
  const ua = userAgent.toLowerCase();

  // TV detection
  if (
    ua.includes('tizen') ||
    ua.includes('webos') ||
    ua.includes('smarttv') ||
    ua.includes('smart-tv') ||
    ua.includes('hbbtv') ||
    ua.includes('netcast') ||
    ua.includes('viera') ||
    ua.includes('bravia')
  ) {
    return 'CINEMATIC';
  }

  // Mobile detection
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipod') ||
    ua.includes('blackberry') ||
    ua.includes('windows phone')
  ) {
    // Check for tablet
    if (
      ua.includes('tablet') ||
      ua.includes('ipad') ||
      (ua.includes('android') && !ua.includes('mobile'))
    ) {
      return 'TABLET';
    }
    return 'SMARTPHONE';
  }

  // Default to desktop
  return 'DESKTOP';
}

/**
 * Get User-Agent from request headers
 */
export function getUserAgent(headers: Headers): string {
  return headers.get('user-agent') || '';
}

/**
 * Detect surface from Next.js request
 */
export function detectSurfaceFromRequest(request: Request): SurfaceType {
  const userAgent = getUserAgent(request.headers);
  return detectSurfaceFromUA(userAgent);
}
