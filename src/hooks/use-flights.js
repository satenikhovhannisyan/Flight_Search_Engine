import { useEffect, useState } from 'react'
import { searchFlights } from '../api/amadeus'
import { normalizeFlightOffers } from '../utils/normalize'

export default function useFlights(searchParams) {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!searchParams) {
      setFlights([])
      setLoading(false)
      setError('')
      return
    }

    let active = true
    setLoading(true)
    setError('')

    ;(async () => {
      try {
        const data = await searchFlights(searchParams)
        if (!active) return
        setFlights(normalizeFlightOffers(data))
      } catch (e) {
        if (!active) return
        setFlights([])
        setError(e?.message || 'Failed to fetch flights')
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [searchParams])

  return { flights, loading, error }
}