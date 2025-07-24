// Google Calendar API configuration
// These values should be set in environment variables for security

export const GOOGLE_CALENDAR_CONFIG = {
  // OAuth2 client configuration
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
  
  // OAuth2 URLs
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  
  // API configuration
  apiBaseUrl: 'https://www.googleapis.com/calendar/v3',
  
  // Required scopes
  scopes: [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly'
  ],
  
  // Default settings
  defaultTimeZone: 'Asia/Seoul',
  defaultEventDuration: 60, // minutes
  defaultReminders: [
    { method: 'popup', minutes: 30 },
    { method: 'email', minutes: 1440 } // 24 hours
  ]
}

/**
 * Generate OAuth2 authorization URL
 * @param state Optional state parameter for security
 */
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CALENDAR_CONFIG.clientId,
    redirect_uri: GOOGLE_CALENDAR_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_CALENDAR_CONFIG.scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    ...(state && { state })
  })

  return `${GOOGLE_CALENDAR_CONFIG.authUrl}?${params.toString()}`
}

/**
 * Check if Google Calendar is configured
 */
export function isGoogleCalendarConfigured(): boolean {
  return !!(
    GOOGLE_CALENDAR_CONFIG.clientId &&
    GOOGLE_CALENDAR_CONFIG.clientSecret
  )
}