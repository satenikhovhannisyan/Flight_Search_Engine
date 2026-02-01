import { useEffect, useRef, useState } from 'react'
import { searchLocations } from '../api/amadeus'

export default function useLocationSearch(inputValue) {
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const abortRef = useRef(null)

    useEffect(() => {
        const q = (inputValue || '').trim()
        if (q.length < 2 || q.length > 30) {
            setOptions([])
            setLoading(false)
            return
        }
        let isActive = true
        setLoading(true)

        // cancel previous
        if (abortRef.current) abortRef.current.abort()
        const controller = new AbortController()
        abortRef.current = controller

        const t = setTimeout(async () => {
            try {
                const res = await searchLocations(q, controller.signal)

                if (!isActive) return
                const data = Array.isArray(res?.data) ? res.data : []
                setOptions(data)
            } catch (e) {
                console.error('searchLocations failed:', e)
                setOptions([])
            } finally {
                if (isActive) setLoading(false)
            }
        }, 300)

        return () => {
            isActive = false
            clearTimeout(t)
            controller.abort()
        }
    }, [inputValue])

    return { options, loading }
}
