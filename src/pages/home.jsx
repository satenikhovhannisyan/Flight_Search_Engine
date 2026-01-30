import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import SearchForm from '../components/search-form/search-form'
import FlightList from '../components/flight-list/flight-list'
import useFlights from '../hooks/use-flights'

export default function Home() {
  const [searchParams, setSearchParams] = useState(null)
  const { flights, loading, error } = useFlights(searchParams)

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

        <SearchForm onSearch={setSearchParams} onReset={() => setSearchParams(null)} />

        <FlightList flights={flights} loading={loading} error={error} />
      </Stack>
    </Container>
  )
}
