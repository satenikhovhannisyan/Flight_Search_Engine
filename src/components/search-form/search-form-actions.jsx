import { Stack, Button } from '@mui/material'

export default function SearchFormActions({ onReset, isSubmitting = false }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
      <Button type="button" variant="text" onClick={onReset}>
        Reset
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        Search flights
      </Button>
    </Stack>
  )
}
