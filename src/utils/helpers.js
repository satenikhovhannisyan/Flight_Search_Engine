export const getAllTouched = (initialobject) =>
  Object.fromEntries(Object.keys(initialobject).map((field) => [field, true]))

export function normalizeFlightOffers(amadeusResponse) {
  const offers = amadeusResponse?.data || []

  return offers.map((offer) => {
    const itineraries = offer.itineraries || []
    const firstItin = itineraries[0]
    const segments = firstItin?.segments || []

    const firstSeg = segments[0]
    const lastSeg = segments[segments.length - 1]

    const price = Number(offer?.price?.grandTotal || offer?.price?.total || 0)
    const currency = offer?.price?.currency || 'USD'

    const airlineCodes = offer?.validatingAirlineCodes || []
    const stops = Math.max(0, segments.length - 1)

    return {
      id: offer.id,
      price,
      currency,
      airlineCodes,
      stops,
      origin: firstSeg?.departure?.iataCode || '',
      destination: lastSeg?.arrival?.iataCode || '',
      departAt: firstSeg?.departure?.at || '',
      arriveAt: lastSeg?.arrival?.at || '',
      duration: firstItin?.duration || '',
    }
  })
}

export const validateSearchForm = (values) => {
    const e = {}
    if (!values.origin?.trim()) e.origin = 'Required'
    if (!values.destination?.trim()) e.destination = 'Required'
    if (!values.departDate) e.departDate = 'Required'
    if (!values.adults || Number(values.adults) < 1) e.adults = 'Min 1'
    const isIata = (v) => /^[A-Z]{3}$/.test((v || '').trim())

    if (!isIata(values.origin)) e.origin = 'Pick a location (IATA code required)'
    if (!isIata(values.destination)) e.destination = 'Pick a location (IATA code required)'

    if (values.origin?.trim()
        && values.destination?.trim()
        && values.origin.trim() === values.destination.trim()
    ) e.destination = 'Must be different from origin'
    if (values.departDate
        && values.returnDate
        && values.returnDate < values.departDate
    ) e.returnDate = 'Must be after departure date'
    return e
}
