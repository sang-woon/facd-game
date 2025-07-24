import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GOOGLE_CALENDAR_CONFIG } from '@/lib/google/config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle errors from Google
  if (error) {
    return NextResponse.redirect(
      new URL(`/schedules?error=${encodeURIComponent(error)}`, request.url)
    )
  }

  // Validate code parameter
  if (!code) {
    return NextResponse.redirect(
      new URL('/schedules?error=missing_code', request.url)
    )
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(GOOGLE_CALENDAR_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CALENDAR_CONFIG.clientId,
        client_secret: GOOGLE_CALENDAR_CONFIG.clientSecret,
        redirect_uri: GOOGLE_CALENDAR_CONFIG.redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    
    // Store tokens in user's profile (in production, encrypt these)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(
        new URL('/auth/login', request.url)
      )
    }

    // TODO: Store tokens securely in database
    // For now, we'll just redirect with success message
    
    return NextResponse.redirect(
      new URL('/schedules?google_connected=true', request.url)
    )
  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(
      new URL('/schedules?error=oauth_failed', request.url)
    )
  }
}