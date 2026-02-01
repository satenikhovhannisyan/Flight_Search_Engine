import { Autocomplete, TextField, InputAdornment, CircularProgress } from '@mui/material'
import { SEARCH_FIELDS } from './field-config'
import useLocationSearch from '../../hooks/use-location-search'

export default function SearchFormAutocomplete({
  fieldKey,
  errors,
  onInputChange,
  inputValue,
  onChange,
  onBlur,
  getOptionLabel,
}) {
  const Icon = SEARCH_FIELDS[fieldKey].icon 
  const { options: fieldOptions, loading: fieldLoading } = useLocationSearch(inputValue)
  const loading = fieldLoading
  const options = fieldOptions;

  return (
    <Autocomplete
      fullWidth
      config={SEARCH_FIELDS[fieldKey]}
      inputValue={inputValue}
      options={options}
      loading={loading}
      error={errors[fieldKey]}
      onInputChange={onInputChange}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      openOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={SEARCH_FIELDS[fieldKey].label}
          placeholder={SEARCH_FIELDS[fieldKey].placeholder}
          onBlur={() => onBlur(fieldKey)}
          error={Boolean(errors[fieldKey])}
          helperText={errors[fieldKey] || SEARCH_FIELDS[fieldKey].helperTextDefault}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {Icon && (
                  <InputAdornment position="start">
                    <Icon fontSize="small" />
                  </InputAdornment>
                )}
                {params.slotProps?.input?.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.slotProps?.input?.endAdornment}
              </>
            ),
          }}
          fullWidth
        />
      )}
    />
  )
}
