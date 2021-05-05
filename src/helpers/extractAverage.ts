// Dependencies
import { differenceBetweenDates } from '../utils'

// Helper
const extractAverage = (data: Array<any>) => {
  const now = Date.now()
  const diffBetweenIssues = data.reduce((ac, { created_at }) =>
    ac + differenceBetweenDates(now, new Date(created_at).getTime()), 0)
  const avg = diffBetweenIssues / data.length
  return Math.round(avg)
}

// Exporting
export default extractAverage