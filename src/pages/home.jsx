import { Container, Stack, Typography } from '@mui/material'
import SearchForm from '../components/search-form/search-form'
import { searchFlights } from '../api/amadeus'

export default function Home() {
  
  const handleSearch = async (payload) => {
  try {
    const data = await searchFlights(payload)
    console.log('Amadeus response:', data)
  } catch (err) {
    console.error(err)
  }
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
