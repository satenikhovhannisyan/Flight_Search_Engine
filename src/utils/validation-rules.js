export const validateSearchForm = (values) => {
    const e = {}
    if (!values.origin?.trim()) e.origin = 'Required'
    if (!values.destination?.trim()) e.destination = 'Required'
    if (!values.departDate) e.departDate = 'Required'
    if (!values.adults || Number(values.adults) < 1) e.adults = 'Min 1'
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
