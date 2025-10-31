'use client'
import { useState } from 'react'

export default function ServiceSeeder({ onServicesAdded }: { onServicesAdded?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const seedServices = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/services/seed', {
        method: 'POST'
      })
      const data = await response.json()
      setMessage(data.message || 'Services added successfully!')
      
      if (data.success && onServicesAdded) {
        setTimeout(() => {
          onServicesAdded()
        }, 1000)
      }
    } catch (error) {
      setMessage('Failed to add services')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-blue-800 mb-2">Quick Setup</h3>
      <p className="text-blue-700 text-sm mb-3">
        Add default services to get started quickly
      </p>
      <button
        onClick={seedServices}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Default Services'}
      </button>
      {message && (
        <p className="mt-2 text-sm text-blue-700">{message}</p>
      )}
    </div>
  )
}