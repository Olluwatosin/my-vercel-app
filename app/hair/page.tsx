'use client'
import { useCatalog } from '../../components/useCatalog'
import { useMemo, useState } from 'react'

function parseNairaToNumber(s: string) {
  const n = (s || '').replace(/[^\d.]/g, '')
  return Number(n || 0)
}

export default function HairPage() {
  const { hair } = useCatalog()
  const [q, setQ] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const filtered = useMemo(() => {
    return hair.filter(h => {
      const hit = h.name.toLowerCase().includes(q.toLowerCase()) || (h.note||'').toLowerCase().includes(q.toLowerCase())
      if (!hit) return false
      const price = parseNairaToNumber(h.price)
      const minOk = min ? price >= Number(min) : true
      const maxOk = max ? price <= Number(max) : true
      return minOk && maxOk
    })
  }, [hair, q, min, max])

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Human Hair & Extensions</h1>
      <p className="text-gray-600">Select from 100% human hair: bone straight, deep wave, kinky curls and more.</p>

      <div className="card grid gap-3 md:grid-cols-3 items-end">
        <div className="grid gap-1">
          <label className="text-xs text-gray-600">Search</label>
          <input className="border rounded-md px-3 py-2" placeholder="e.g., bone straight, 16&quot;" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-600">Min ₦</label>
          <input className="border rounded-md px-3 py-2" placeholder="0" value={min} onChange={e=>setMin(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-600">Max ₦</label>
          <input className="border rounded-md px-3 py-2" placeholder="150000" value={max} onChange={e=>setMax(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h, i) => (
          <div key={i} className="card overflow-hidden">
            {'image' in h && (h as any).image && (
              <div className="mb-3 -mx-4 -mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(h as any).image} alt={h.name} className="w-full h-44 object-cover" />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{h.name}</p>
                {'note' in h && (h as any).note && <p className="text-sm text-gray-600 mt-1">{(h as any).note}</p>}
              </div>
              <p className="font-semibold">{h.price}</p>
            </div>
          </div>
        ))}
      </div>
      {!filtered.length && <p className="text-gray-500">No hair matches your filters.</p>}
    </div>
  )
}
