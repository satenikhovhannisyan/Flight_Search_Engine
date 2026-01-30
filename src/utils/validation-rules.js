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
