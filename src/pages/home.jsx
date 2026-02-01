import { useState, useMemo, useEffect } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import SearchForm from '../components/search-form/search-form'
import FlightList from '../components/flight-list/flight-list'
import useFlights from '../hooks/use-flights'
import Filters from '../components/filters/filters'
import PriceGraph from '../components/price-graph/price-graph'

let hasSearched = false;

export default function Home() {
  const [searchParams, setSearchParams] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10)
  const [filters, setFilters] = useState({
    maxPrice: null,
    stops: 'any',
    airlines: [],
  })

  const updateParams = (params) => {
    setSearchParams(params)
    setVisibleCount(10)
  }

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

  const visibleFlights = filteredFlights.slice(0, visibleCount)
  const canShowMore = visibleCount < filteredFlights.length && !loading;

  useEffect(() => {
    hasSearched = Boolean(searchParams);   
  }, [searchParams]);

  const noData = !loading && hasSearched && !flights.length

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(rgba(10, 20, 40, 0.65), rgba(10, 20, 40, 0.65)), url(/bg-sky.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
        py: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h3" fontWeight={700} sx={{ color: '#fff' }}>
              Welcome to FlightFinder
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Search flights, filter instantly, and watch price trends update live.
            </Typography>
          </Stack>

          <SearchForm updateParams={updateParams} />

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            gap: 2,
          }}>
            <Filters
              flights={flights}
              filters={filters}
              onChange={setFilters}
            />
            <PriceGraph flights={filteredFlights} />
          </Box>

          <FlightList
            flights={visibleFlights}
            loading={loading}
            error={error}
            noDataMessage={noData}
          />

          {canShowMore && (
            <Button
              variant='contained'
              sx={{ alignSelf: 'center', maxWidth: 'fit-content' }}
              onClick={() => setVisibleCount((c) => c + 10)}>
              Show more
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
