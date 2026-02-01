import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

export default function Filters({ flights, filters, onChange }) {
  if (!flights.length) return null

  const maxAvailablePrice = Math.max(...flights.map((f) => f.price))

  const airlines = Array.from(
    new Set(flights.flatMap((f) => f.airlineCodes))
  )

  return (
    <Stack spacing={2} sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 2, flex: '0 0 300px' }}>
      <Typography variant="subtitle1" fontWeight={600}>
        Filters
      </Typography>

      {/* Price */}
      <Box>
        <Typography gutterBottom>
          Max price {filters.maxPrice ? `(${filters.maxPrice})` : ''}
        </Typography>
        <Slider
          value={filters.maxPrice ?? maxAvailablePrice}
          min={0}
          max={maxAvailablePrice}
          step={10}
          onChange={(e, value) =>
            onChange({ ...filters, maxPrice: value })
          }
        />
      </Box>

      {/* Stops */}
      <FormControl size="small">
        <InputLabel>Stops</InputLabel>
        <Select
          label="Stops"
          value={filters.stops}
          onChange={(e) =>
            onChange({ ...filters, stops: e.target.value })
          }
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value={0}>Non-stop</MenuItem>
          <MenuItem value={1}>1 stop</MenuItem>
          <MenuItem value={2}>2+ stops</MenuItem>
        </Select>
      </FormControl>

      {/* Airlines */}
      <Box>
        <Typography gutterBottom>Airlines</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {airlines.map((a) => (
            <Chip
              key={a}
              label={a}
              clickable
              color={filters.airlines.includes(a) ? 'primary' : 'default'}
              onClick={() => {
                const next = filters.airlines.includes(a)
                  ? filters.airlines.filter((x) => x !== a)
                  : [...filters.airlines, a]
                onChange({ ...filters, airlines: next })
              }}
            />
          ))}
        </Stack>
      </Box>

    </Stack>
  )
}
