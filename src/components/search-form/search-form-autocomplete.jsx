import { Autocomplete, TextField, InputAdornment, CircularProgress } from '@mui/material'

export default function SearchFormAutocomplete({
  fieldKey,
  config,
  inputValue,
  options,
  loading,
  error,
  onInputChange,
  onChange,
  onBlur,
  getOptionLabel,
}) {
  const Icon = config.icon  

  return (
    <Autocomplete
      fullWidth
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      openOnFocus
      open={Boolean(inputValue) && options.length > 0}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={config.label}
          placeholder={config.placeholder}
          onBlur={() => onBlur(fieldKey)}
          error={Boolean(error)}
          helperText={error || config.helperTextDefault}
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
