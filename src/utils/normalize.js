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