import { CssBaseline, ThemeProvider } from '@mui/material'
import Home from './pages/home'
import theme from './utils/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}