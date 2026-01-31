import { useState, useMemo } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import SearchForm from '../components/search-form/search-form'
import FlightList from '../components/flight-list/flight-list'
import useFlights from '../hooks/use-flights'
import Filters from '../components/filters/filters'
import PriceGraph from '../components/price-graph/price-graph'

export default function Home() {
  const [searchParams, setSearchParams] = useState(null)
  const [filters, setFilters] = useState({
    maxPrice: null,
    stops: 'any',
    airlines: [],
  })

  const { flights, loading, error } = useFlights(searchParams)
  const filteredFlights = useMemo(() => {
    return flights.filter((f) => {
      if (filters.maxPrice != null && f.price > filters.maxPrice) return false
      if (filters.stops !== 'any' && f.stops !== filters.stops) return false
      if (
        filters.airlines.length &&
        !filters.airlines.some((a) => f.airlineCodes.includes(a))
      )
        return false
      return true
    })
  }, [flights, filters])


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

        <Filters
          flights={flights}
          filters={filters}
          onChange={setFilters}
        />

        <PriceGraph flights={filteredFlights} />

        <FlightList
          flights={filteredFlights}
          loading={loading}
          error={error}
        />
      </Stack>
    </Container>
  )
}
