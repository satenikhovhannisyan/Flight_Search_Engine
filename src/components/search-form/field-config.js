import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import TodayIcon from '@mui/icons-material/Today'
import PersonIcon from '@mui/icons-material/Person'

export const SEARCH_FIELDS = {
  origin: {
    label: 'Origin',
    placeholder: 'city or airport (e.g. Yerevan)',
    helperTextDefault: 'Select a location from the list',
    icon: FlightTakeoffIcon,
    transform: (value) => value.toUpperCase(),
    isAutocomplete: true,
  },
  destination: {
    label: 'Destination',
    placeholder: 'city or airport (e.g. London)',
    helperTextDefault: 'Select a location from the list',
    icon: FlightLandIcon,
    transform: (value) => value.toUpperCase(),
    isAutocomplete: true,
  },
  departDate: {
    label: 'Departure date',
    type: 'date',
    helperTextDefault: ' ',
    icon: TodayIcon,
    shrinkLabel: true,
  },
  returnDate: {
    label: 'Return date (optional)',
    type: 'date',
    helperTextDefault: ' ',
    icon: null,
    shrinkLabel: true,
  },
  adults: {
    label: 'Adults',
    type: 'number',
    helperTextDefault: ' ',
    icon: PersonIcon,
    inputProps: { min: 1, max: 9 },
  },
}