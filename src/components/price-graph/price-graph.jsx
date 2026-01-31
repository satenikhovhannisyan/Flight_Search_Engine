import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Paper, Typography } from '@mui/material'

export default function PriceGraph({ flights }) {
  if (!flights.length) return null

  const data = flights.map((f, i) => ({
    index: i + 1,
    price: f.price,
  }))

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography fontWeight={600} gutterBottom>
        Price distribution
      </Typography>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="index" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  )
}
