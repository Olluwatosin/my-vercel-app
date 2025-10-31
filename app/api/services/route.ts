import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '../../../lib/mongodb'
import Service from '../../../models/Service'

export async function GET() {
  try {
    await connectDB()
    const services = await (Service as any).find({ isActive: true }).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, services })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const service = await (Service as any).create(body)
    return NextResponse.json({ success: true, service })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { _id, ...updateData } = body
    const service = await (Service as any).findByIdAndUpdate(_id, updateData, { new: true })
    return NextResponse.json({ success: true, service })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    await (Service as any).findByIdAndUpdate(id, { isActive: false })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 })
  }
}