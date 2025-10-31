import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Check credentials against environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@damzzbeauty.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'DamzzAdmin2024!'
    const jwtSecret = process.env.JWT_SECRET || 'damzz-beauty-super-secret-key-2024'

    if (email === adminEmail && password === adminPassword) {
      // Create JWT token
      const token = jwt.sign(
        { email, role: 'admin' },
        jwtSecret,
        { expiresIn: '24h' }
      )

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 })
  }
}