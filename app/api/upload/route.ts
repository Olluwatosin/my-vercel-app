import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Determine if file is video or image
    const isVideo = file.type.startsWith('video/')
    
    const uploadOptions = {
      folder: 'damzz-beauty',
      resource_type: isVideo ? 'video' as const : 'image' as const,
      ...(isVideo && {
        eager: [
          { width: 400, height: 300, crop: 'pad', quality: 'auto' },
          { width: 160, height: 100, crop: 'crop', gravity: 'center', format: 'jpg' }
        ]
      })
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const response = result as any
    return NextResponse.json({ 
      url: response.secure_url,
      type: isVideo ? 'video' : 'image',
      thumbnail: isVideo ? response.eager?.[1]?.secure_url : response.secure_url
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}