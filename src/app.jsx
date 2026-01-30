import { CssBaseline, ThemeProvider } from '@mui/material'
import Home from './pages/home'
import theme from './utils/theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {
  return (

    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Home />
      </LocalizationProvider>
    </ThemeProvider>
  )
}