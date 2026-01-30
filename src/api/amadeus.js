import { AUTH_TOKEN, BASE_URL, FLIGHT_OFFERS } from "./endpoints"

let accessToken = null
let tokenExpiresAt = null

async function getAccessToken() {
    if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
        return accessToken
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', import.meta.env.VITE_AMADEUS_API_KEY)
    params.append('client_secret', import.meta.env.VITE_AMADEUS_API_SECRET)

    const res = await fetch(`${BASE_URL}${AUTH_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    })

    if (!res.ok) {
        throw new Error('Failed to get Amadeus access token')
    }

    const data = await res.json()

    accessToken = data.access_token
    tokenExpiresAt = Date.now() + data.expires_in * 1000

    return accessToken
}

async function amadeusFetch(url) {
    const token = await getAccessToken()

    const res = await fetch(`${BASE_URL}${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const errText = await res.text()
        console.error('Amadeus error:', res.status, errText)
        throw new Error(errText)
    }
    return res.json()
}

export async function searchFlights(params) {
    const query = new URLSearchParams({
        originLocationCode: params.origin,
        destinationLocationCode: params.destination,
        departureDate: params.departDate,
        adults: params.adults,
        ...(params.returnDate && { returnDate: params.returnDate }),
        currencyCode: 'USD',
        max: 20,
    })

    return amadeusFetch(`${FLIGHT_OFFERS}${query.toString()}`)
}
export async function searchLocations(keyword, signal) {
    const q = (keyword || '').trim()
    if (q.length < 2) return { data: [] }

    const query = new URLSearchParams({
        keyword: q,
        subType: 'AIRPORT,CITY',
        view: 'FULL',
        'page[limit]': '8',
        sort: 'analytics.travelers.score',
    })

    return amadeusFetch(`/v1/reference-data/locations?${query.toString()}`, { signal })
}
