import { Container, Stack, Typography } from '@mui/material'
import SearchForm from '../components/search-form/search-form'

export default function Home() {
  const handleSearch = (payload) => {
    console.log('search payload:', payload)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h4" fontWeight={700}>
            Welcome to FlightFinder
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search flights, filter instantly, and watch price trends update live.
          </Typography>
        </Stack>

        <SearchForm onSearch={handleSearch} />

      </Stack>
    </Container>
  )
}
