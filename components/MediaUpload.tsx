'use client'
import { useState } from 'react'

interface MediaUploadProps {
  onUpload: (url: string, type: 'image' | 'video', thumbnail?: string) => void
  currentMedia?: string
  mediaType?: 'image' | 'video'
  disabled?: boolean
}

export default function MediaUpload({ onUpload, currentMedia, mediaType = 'image', disabled }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.url) {
        onUpload(data.url, data.type, data.thumbnail)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        {currentMedia ? (
          <div className="space-y-3">
            {mediaType === 'video' ? (
              <video 
                src={currentMedia} 
                className="w-full h-48 object-cover rounded-lg"
                controls
                muted
              />
            ) : (
              <img 
                src={currentMedia} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg" 
              />
            )}
            <p className="text-sm text-gray-600">
              {mediaType === 'video' ? '🎥 Video uploaded' : '📷 Image uploaded'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-4xl text-gray-400">
              {uploading ? '⏳' : '📁'}
            </div>
            <p className="text-gray-600">
              {uploading ? 'Uploading...' : 'Upload image or video'}
            </p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          disabled={uploading || disabled}
        />
        
        {uploading && (
          <div className="mt-2 text-pink-600 text-sm">
            Uploading... Please wait
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500">
        Supported: Images (JPG, PNG, GIF) and Videos (MP4, MOV, AVI)
      </div>
    </div>
  )
}