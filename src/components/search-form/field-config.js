import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import TodayIcon from '@mui/icons-material/Today'
import PersonIcon from '@mui/icons-material/Person'

export const SEARCH_FIELDS = {
  origin: {
    label: 'Origin',
    placeholder: 'e.g. EVN',
    helperTextDefault: 'Airport code or city',
    icon: FlightTakeoffIcon,
    transform: (value) => value.toUpperCase(),
  },
  destination: {
    label: 'Destination',
    placeholder: 'e.g. CDG',
    helperTextDefault: 'Airport code or city',
    icon: FlightLandIcon,
    transform: (value) => value.toUpperCase(),
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