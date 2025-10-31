'use client'

import { useEffect, useState } from 'react'
import baseProducts from '../data/products.json'
import baseHair from '../data/hair.json'
import baseServices from '../data/services.json'

export type Product = { name: string; price: string; inStock?: boolean; note?: string; image?: string }
export type Hair = { name: string; price: string; note?: string; image?: string }
export type Service = { name: string; duration?: string; price?: string; description?: string }

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try { const v = window.localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
function writeLS<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [hair, setHair] = useState<Hair[]>([])
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    setProducts(readLS<Product[]>('products_catalog', baseProducts as Product[]))
    setHair(readLS<Hair[]>('hair_catalog', baseHair as Hair[]))
    setServices(readLS<Service[]>('services_catalog', baseServices as Service[]))
  }, [])

  const saveProducts = (v: Product[]) => { setProducts(v); writeLS('products_catalog', v) }
  const saveHair = (v: Hair[]) => { setHair(v); writeLS('hair_catalog', v) }
  const saveServices = (v: Service[]) => { setServices(v); writeLS('services_catalog', v) }

  const exportBlob = (filename: string, data: unknown) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return { products, hair, services, saveProducts, saveHair, saveServices, exportBlob }
}
