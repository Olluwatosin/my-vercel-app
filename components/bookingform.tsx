'use client'

import { useMemo, useState } from 'react'
import baseServices from '../data/services.json'

type ServiceItem = {
  name: string
  duration?: string   // e.g., "1–2 hrs" or "1.5–2 hrs"
  price?: string
  description?: string
}

const WHATSAPP_NUMBER = '2349016469984' // change if needed
const BOOKING_EMAIL = 'dammzhairven@gmail.com' // change to your email
const BUSINESS_ADDRESS = '14 Plaza, Shop 4, After Abuja Unity Hospital, Lugbe FHA, Abuja'
const BUSINESS_NAME = 'Dammz Hairven'

function parseDurationToMinutes(s?: string): number {
  if (!s) return 60
  // Try to get first number in hours, supports "1–2 hrs", "1.5–2 hrs", "2 hrs", "90 mins"
  const mins = s.match(/(\d+)\s*min/i)
  if (mins) return Number(mins[1])
  const hours = s.match(/(\d+(\.\d+)?)/)
  if (hours) return Math.round(parseFloat(hours[1]) * 60)
  return 60
}

function toGoogleDate(date: string, time: string) {
  // date "YYYY-MM-DD", time "HH:MM"
  return `${date.replaceAll('-', '')}T${time.replace(':', '')}00`
}

export default function BookingForm() {
  // Allow admin overrides from localStorage if present
  const services: ServiceItem[] = useMemo(() => {
    if (typeof window === 'undefined') return baseServices as ServiceItem[]
    try {
      const raw = window.localStorage.getItem('services_catalog')
      if (raw) return JSON.parse(raw) as ServiceItem[]
    } catch {}
    return baseServices as ServiceItem[]
  }, [])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(services[0]?.name || '')
  const selected = useMemo(() => services.find(s => s.name === service), [service, services])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [copied, setCopied] = useState(false)

  const message = useMemo(() => {
    const lines = [
      `New Appointment Request — ${BUSINESS_NAME}`,
      `Name: ${name || '-'}`,
      `Phone: ${phone || '-'}`,
      `Service: ${service || '-'}`,
      `Date: ${date || '-'}`,
      `Time: ${time || '-'}`,
      `Notes: ${notes || '-'}`,
      selected?.duration ? `Est. Duration: ${selected.duration}` : '',
      selected?.price ? `Est. Price: ${selected.price}` : '',
      `Address: ${BUSINESS_ADDRESS}`,
      `Instagram: @damzz_beautylounge`
    ].filter(Boolean)
    return lines.join('\n')
  }, [name, phone, service, date, time, notes, selected])

  const whatsappHref = useMemo(() => {
    const encoded = encodeURIComponent(`Hello ${BUSINESS_NAME} 👋\n\n${message}\n\nPlease confirm my appointment.`)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  }, [message])

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('New Appointment — ' + BUSINESS_NAME)
    const body = encodeURIComponent(message)
    return `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`
  }, [message])

  const gcalHref = useMemo(() => {
    if (!date || !time) return '#'
    const start = toGoogleDate(date, time)
    const mins = parseDurationToMinutes(selected?.duration)
    // compute end in UTC-less basic form (Google accepts local)
    const startDate = new Date(`${date}T${time}:00`)
    const endDate = new Date(startDate.getTime() + mins * 60000)
    const end = `${endDate.getFullYear()}${String(endDate.getMonth()+1).padStart(2,'0')}${String(endDate.getDate()).padStart(2,'0')}T${String(endDate.getHours()).padStart(2,'0')}${String(endDate.getMinutes()).padStart(2,'0')}00`
    const details = encodeURIComponent(message)
    const location = encodeURIComponent(BUSINESS_ADDRESS)
    const text = encodeURIComponent(`${service} — ${BUSINESS_NAME}`)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`
  }, [date, time, selected, message, service])

  const downloadICS = () => {
    if (!date || !time) return
    const mins = parseDurationToMinutes(selected?.duration)
    const startDate = new Date(`${date}T${time}:00`)
    const endDate = new Date(startDate.getTime() + mins * 60000)
    const fmt = (d: Date) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}T${String(d.getUTCHours()).padStart(2,'0')}${String(d.getUTCMinutes()).padStart(2,'0')}00Z`
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dammz Hairven//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@dammzhairven`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(startDate)}`,
      `DTEND:${fmt(endDate)}`,
      `SUMMARY:${service} — ${BUSINESS_NAME}`,
      `DESCRIPTION:${message.replace(/\n/g, '\\n')}`,
      `LOCATION:${BUSINESS_ADDRESS}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${service.replace(/\s+/g,'_')}_${date}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const requiredOk = name.trim() && phone.trim() && service.trim() && date && time

  return (
    <form className="card grid gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Full Name *</label>
        <input className="border rounded-md px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Phone Number (WhatsApp preferred) *</label>
        <input className="border rounded-md px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 0901 646 9984" required />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Service *</label>
        <select className="border rounded-md px-3 py-2" value={service} onChange={(e) => setService(e.target.value)} required>
          {services.map((s, i) => (
            <option key={i} value={s.name}>{s.name}{s.price ? ` — ${s.price}` : ''}</option>
          ))}
        </select>

        {/* Auto details panel */}
        <div className="mt-2 grid gap-1 text-sm">
          {selected?.duration && (<div className="text-gray-600">Estimated Duration: <span className="font-medium">{selected.duration}</span></div>)}
          {selected?.price && (<div className="text-gray-600">Estimated Price: <span className="font-medium">{selected.price}</span></div>)}
          {selected?.description && (<div className="text-gray-500">{selected.description}</div>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Preferred Date *</label>
          <input type="date" className="border rounded-md px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Preferred Time *</label>
          <input type="time" className="border rounded-md px-3 py-2" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea className="border rounded-md px-3 py-2 min-h-[100px]" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any details we should know? e.g., hair type, install type, color preference" />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <a href={mailtoHref} className={`btn-primary text-center ${!requiredOk ? 'opacity-60 pointer-events-none' : ''}`} onClick={(e) => { if (!requiredOk) e.preventDefault() }}>
          Submit via Email
        </a>

        <a href={whatsappHref} target="_blank" className={`btn bg-white border text-brand text-center hover:bg-gray-50 ${!requiredOk ? 'opacity-60 pointer-events-none' : ''}`} onClick={(e) => { if (!requiredOk) e.preventDefault() }}>
          Send on WhatsApp
        </a>

        <a href={gcalHref} target="_blank" className={`btn bg-gray-100 hover:bg-gray-200 text-center ${!requiredOk ? 'opacity-60 pointer-events-none' : ''}`} onClick={(e) => { if (!requiredOk) e.preventDefault() }}>
          Add to Google Calendar
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <button type="button" onClick={downloadICS} className={`btn bg-gray-100 hover:bg-gray-200 ${!requiredOk ? 'opacity-60 pointer-events-none' : ''}`}>
          Download .ics (Apple/Outlook)
        </button>
        <button type="button" onClick={async () => {
          try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(()=>setCopied(false), 2000) } catch {}
        }} className="btn bg-gray-100 hover:bg-gray-200">
          {copied ? 'Copied ✓' : 'Copy Details'}
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Calendar: Uses your chosen date/time and service duration (defaults to 60 mins if not specified).
      </p>
    </form>
  )
}
