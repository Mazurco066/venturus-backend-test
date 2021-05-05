// Dependencies
import { differenceBetweenDates } from '../utils'

// Helper
const extractAverage = (data: Array<any>) => Math.round(
  data.reduce(
    (ac, { created_at }) => ac + differenceBetweenDates(
      Date.now(),
      new Date(created_at).getTime()
    ), 0
  ) / data.length
)

// Exporting
export default extractAverage