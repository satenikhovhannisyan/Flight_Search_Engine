import { Alert, Box, Chip, Paper, Stack, Typography } from '@mui/material'

function line(label, value) {
  return (
    <Typography variant="body2" color="text.secondary">
      <b>{label}:</b> {value}
    </Typography>
  )
}

export default function FlightList({ flights, loading, error }) {
  if (loading) return <Typography>Loading flights…</Typography>
  if (error) return <Alert severity="error">{error}</Alert>
  if (!flights?.length) return <Typography color="text.secondary">No results yet.</Typography>

  return (
    <Stack spacing={1.5}>
      {flights.map((f) => (
        <Paper key={f.id} variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
              <Typography fontWeight={700}>
                {f.origin} → {f.destination}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }} flexWrap="wrap">
                <Chip size="small" label={`${f.stops} stop${f.stops === 1 ? '' : 's'}`} />
                {f.airlineCodes.map((c) => (
                  <Chip key={c} size="small" label={c} />
                ))}
              </Stack>
            </Box>

            <Typography variant="h6" fontWeight={800}>
              {f.price} {f.currency}
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
            {line('Departure', f.departAt)}
            {line('Arrival', f.arriveAt)}
            {line('Duration', f.duration)}
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}