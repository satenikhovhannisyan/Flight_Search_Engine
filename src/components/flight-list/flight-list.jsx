import { Alert, Box, Chip, Paper, Stack, Typography, CircularProgress } from '@mui/material'

function line(label, value) {
  return (
    <Typography variant="body2" color="text.secondary">
      <b>{label}:</b> {value}
    </Typography>
  )
}

export default function FlightList({ flights, loading, error, noDataMessage }) {
  if (loading) return <CircularProgress sx={{ alignSelf: 'center' }} />
  if (error) return <Alert severity="error">{error}</Alert>
  if (noDataMessage) return <Typography color="text.secondary" sx={{ alignSelf: 'center'}}>No results yet.</Typography>

  return (
      <Stack spacing={1.5}>
        {flights.map((f) => (
          <Paper key={f.id} variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems='center'
              spacing={2}
            >
              <Box>
                <Typography
                  fontWeight={700}
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'primary.contrastText',
                    display: 'inline-block',
                    px: 1,
                    borderRadius: 1,
                    mb: 0.5
                  }}
                >
                  {f.origin} → {f.destination}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }} flexWrap="wrap">
                  <Chip size="small" label={`${f.stops} stop${f.stops === 1 ? '' : 's'}`} />
                  {f.airlineCodes.map((c) => (
                    <Chip key={c} size="small" label={c} />
                  ))}
                </Stack>
              </Box>

              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  alignSelf: 'center',
                  color: 'primary.main',
                }}
              >
                {f.price} {f.currency}
              </Typography>
            </Stack>


            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 1 }}
              margin={{ xs: 'auto', sm: 'inherit' }}
              width='fit-content'
            >
              {line('Departure', f.departAt)}
              {line('Arrival', f.arriveAt)}
              {line('Duration', f.duration)}
            </Stack>
          </Paper>
        ))}
      </Stack>
  )
}