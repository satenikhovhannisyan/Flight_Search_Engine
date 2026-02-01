import { useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { Paper, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import SearchFormField from './search-form-field'
import SearchFormActions from './search-form-actions'
import { initialForm } from '../../utils/constants'
import { SEARCH_FIELDS } from './field-config'
import useValidation from '../../hooks/use-search-validation'
import { validateSearchForm } from '../../utils/helpers'
import { getAllTouched } from '../../utils/helpers'
import SearchFormAutocomplete from './search-form-autocomplete'

export default function SearchForm({ updateParams }) {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [originInput, setOriginInput] = useState('')
  const [destinationInput, setDestinationInput] = useState('')

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

    updateParams?.({
      ...form,
      origin: form.origin.trim().toUpperCase(),
      destination: form.destination.trim().toUpperCase(),
      adults: Number(form.adults),
    })
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="stretch">
          {['origin', 'destination'].map((fieldKey) => {
            return (
              <SearchFormAutocomplete
                key={fieldKey}
                fieldKey={fieldKey}
                errors={errors}
                inputValue={fieldKey === 'origin' ? originInput : destinationInput}
                onInputChange={(e, value, reason) => {
                  if (reason !== 'input') return 
                  setField(fieldKey, '')
                  if (fieldKey === 'origin') {
                    setOriginInput(value)
                  } else {
                    setDestinationInput(value)
                  }
                }}
                onChange={(e, value) => {
                  if (fieldKey === 'origin') {
                    setField('origin', value?.iataCode || '')
                    setOriginInput(value?.iataCode || '')
                  } else {
                    setField('destination', value?.iataCode || '')
                    setDestinationInput(value?.iataCode || '')
                  } 
                }}
                getOptionLabel={getLocationLabel}
                filterOptions={(x) => x}
                onBlur={() => handleBlur(fieldKey)}
              />
            ) 
          }
          )}
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
            updateParams?.(null)
          }}
        />
      </Stack>
    </Paper>
  )
}
