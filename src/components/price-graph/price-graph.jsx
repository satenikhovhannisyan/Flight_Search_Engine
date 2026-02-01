import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Stack, Typography } from '@mui/material'


function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const data = payload[0].payload

  const contentItems = {
    route: data.route,
    price: `${data.price} ${data.currency}`,
    airlines: data.airlines,
    stops: data.stops,
    departAt: data.departAt,
    arriveAt: data.arriveAt,
    duration: data.duration,
  };

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 8,
        padding: 12,
        maxWidth: 260,
        fontSize: 13
      }}
    >
      {Object.entries(contentItems).map(([key, value]) => (
        <div key={key} style={{ marginBottom: 6 }}>
          <strong style={{ textTransform: 'capitalize' }}>
            {key.replace(/([A-Z])/g, ' $1')}:
          </strong>
          {' '}{value}
        </div>
      ))}
    </div>
  )
}


export default function PriceGraph({ flights }) {
  if (!flights.length) return null

  const data = flights.map((f, i) => ({
    index: i + 1,
    price: f.price,
    currency: f.currency,
    airlines: f.airlineCodes?.join(', ') || '—',
    stops: f.stops,
    route: `${f.origin} → ${f.destination}`,
    departAt: f.departAt,
    arriveAt: f.arriveAt,
    duration: f.duration,
  }))


  return (
    <Stack
      spacing={2}
      variant="outlined"
      sx={{
        backgroundColor: 'background.paper',
        p: 2,
        borderRadius: 2,
        minWidth: 300,
        flexGrow: 1
      }}>
      <Typography fontWeight={600} gutterBottom>
        Price distribution
      </Typography>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="index" hide />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="price" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

    </Stack>
  )
}
