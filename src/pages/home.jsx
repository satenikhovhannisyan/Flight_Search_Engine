import { Container, Stack, Typography, Paper } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h4" fontWeight={700}>
            Flight Search
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search flights, filter instantly, and watch price trends update live.
          </Typography>
        </Stack>

      </Stack>
    </Container>
  )
}
