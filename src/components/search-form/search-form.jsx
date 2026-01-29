import { useState, useCallback } from 'react'
import { Paper, Stack } from '@mui/material'
import SearchFormField from './search-form-field'
import SearchFormActions from './search-form-actions'
import { initialForm } from './constants'
import { SEARCH_FIELDS } from './field-config'
import useValidation from '../../hooks/use-search-validation'
import { validateSearchForm } from '../../utils/validation-rules'
import { getAllTouched } from '../../utils/helpers'

export default function SearchForm({ onSearch }) {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})

  const errors = useValidation(form, touched, validateSearchForm)

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleBlur = useCallback((key) => setTouched((prev) => ({ ...prev, [key]: true })), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(getAllTouched(initialForm))

    const hasErrors = Object.keys(errors).length > 0
    if (hasErrors) return

    onSearch?.({
      ...form,
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      adults: Number(form.adults),
    })
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
          <SearchFormField
            fieldKey="origin"
            config={SEARCH_FIELDS.origin}
            value={form.origin}
            error={errors.origin}
            onChange={setField}
            onBlur={handleBlur}
          />
          <SearchFormField
            fieldKey="destination"
            config={SEARCH_FIELDS.destination}
            value={form.destination}
            error={errors.destination}
            onChange={setField}
            onBlur={handleBlur}
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {['departDate', 'returnDate', 'adults'].map((fieldKey) => (
            <SearchFormField
              key={fieldKey}
              fieldKey={fieldKey}
              config={SEARCH_FIELDS[fieldKey]}
              value={form[fieldKey]}
              error={errors[fieldKey]}
              onChange={setField}
              onBlur={handleBlur}
            />
          ))}
        </Stack>

        <SearchFormActions
          onReset={() => {
            setForm(initialForm)
            setTouched(initialForm)
          }}
        />
      </Stack>
    </Paper>
  )
}
