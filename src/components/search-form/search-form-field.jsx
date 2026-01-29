import { TextField, InputAdornment } from '@mui/material'

export default function SearchFormField({
  fieldKey,
  config,
  value,
  error,
  onChange,
  onBlur,
}) {
  const Icon = config.icon
  
  return (
    <TextField
      variant="outlined"
      label={config.label}
      type={config.type || 'text'}
      placeholder={config.placeholder}
      value={value}
      onChange={(e) => {
        const newValue = config.transform
          ? config.transform(e.target.value)
          : e.target.value
        onChange(fieldKey, newValue)
      }}
      onBlur={() => onBlur(fieldKey)}
      error={Boolean(error)}
      helperText={error || config.helperTextDefault}
      slotProps={{
        ...(config.shrinkLabel && { inputLabel: { shrink: true } }),
        input: {
          ...(Icon && {
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small" />
              </InputAdornment>
            ),
          }),
        },
        ...(config.inputProps && { htmlInput: config.inputProps }),
      }}
      fullWidth
    />
  )
}