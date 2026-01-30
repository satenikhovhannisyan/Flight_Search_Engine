import { useState, useCallback } from 'react'
import { Paper, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import SearchFormField from './search-form-field'
import SearchFormActions from './search-form-actions'
import { initialForm } from '../../utils/constants'
import { SEARCH_FIELDS } from './field-config'
import useValidation from '../../hooks/use-search-validation'
import { validateSearchForm } from '../../utils/validation-rules'
import { getAllTouched } from '../../utils/helpers'
import useLocationSearch from '../../hooks/use-location-search'
import SearchFormAutocomplete from './search-form-autocomplete'

export default function SearchForm({ onSearch }) {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [originInput, setOriginInput] = useState('')
  const [destinationInput, setDestinationInput] = useState('')

  const { options: originOptions, loading: originLoading } = useLocationSearch(originInput)
  const { options: destinationOptions, loading: destinationLoading } = useLocationSearch(destinationInput)

  const getLocationLabel = (opt) => {
    if (!opt) return ''
    const code = opt.iataCode || ''
    const name = opt.name || ''
    const country = opt?.address?.countryName ? `, ${opt.address.countryName}` : ''
    const subtype = opt.subType ? ` • ${opt.subType}` : ''
    return `${code} — ${name}${country}${subtype}`
  }

  const errors = useValidation(form, touched, validateSearchForm)

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleBlur = useCallback((key) => setTouched((prev) => ({ ...prev, [key]: true })), [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const submitErrors = validateSearchForm(form)
    const hasErrors = Object.keys(submitErrors).length > 0

    if (hasErrors) {
      setTouched(getAllTouched(initialForm))
      return
    }

    onSearch?.({
      ...form,
      origin: form.origin.trim().toUpperCase(),
      destination: form.destination.trim().toUpperCase(),
      adults: Number(form.adults),
    })
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
          <SearchFormAutocomplete
            fieldKey="origin"
            config={SEARCH_FIELDS.origin}
            inputValue={originInput}
            options={originOptions}
            loading={originLoading}
            error={errors.origin}
            onInputChange={(e, value, reason) => {
              if (reason === 'reset') return
              setOriginInput(value)
              setField('origin', '')
            }}
            onChange={(e, value) => {
              setField('origin', value?.iataCode || '')
              setOriginInput(value ? getLocationLabel(value) : '')
            }}
            getOptionLabel={getLocationLabel}
            filterOptions={(x) => x}
            onBlur={handleBlur}
          />

          <SearchFormAutocomplete
            fieldKey="destination"
            config={SEARCH_FIELDS.destination}
            inputValue={destinationInput}
            options={destinationOptions}
            loading={destinationLoading}
            error={errors.destination}
            onInputChange={(e, value, reason) => {
              if (reason === 'reset') return
              setDestinationInput(value)
              setField('destination', '')
            }}
            onChange={(e, value) => {
              setField('destination', value?.iataCode || '')
              setDestinationInput(value ? getLocationLabel(value) : '')
            }}
            getOptionLabel={getLocationLabel}
            filterOptions={(x) => x}
            onBlur={handleBlur}
          />

        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <DatePicker
            label={SEARCH_FIELDS.departDate.label}
            value={form.departDate ? dayjs(form.departDate) : null}
            minDate={dayjs()}
            onChange={(newValue) => {
              setField('departDate', newValue ? newValue.format('YYYY-MM-DD') : '')

              if (newValue && form.returnDate && dayjs(form.returnDate).isBefore(newValue, 'day')) {
                setField('returnDate', '')
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                onBlur: () => handleBlur('departDate'),
                error: Boolean(errors.departDate),
                helperText: errors.departDate || ' ',
              },
            }}
          />

          <DatePicker
            label={SEARCH_FIELDS.returnDate.label}
            value={form.returnDate ? dayjs(form.returnDate) : null}
            minDate={form.departDate ? dayjs(form.departDate) : dayjs()}
            disabled={!form.departDate}
            onChange={(newValue) => {
              setField('returnDate', newValue ? newValue.format('YYYY-MM-DD') : '')
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                onBlur: () => handleBlur('returnDate'),
                error: Boolean(errors.returnDate),
                helperText: errors.returnDate || ' ',
              },
            }}
          />

          <SearchFormField
            fieldKey="adults"
            config={SEARCH_FIELDS.adults}
            value={form.adults}
            error={errors.adults}
            onChange={setField}
            onBlur={handleBlur}
          />
        </Stack>

        <SearchFormActions
          onReset={() => {
            setForm(initialForm)
            setTouched({})
            setOriginInput('')
            setDestinationInput('')
          }}
        />
      </Stack>
    </Paper>
  )
}
