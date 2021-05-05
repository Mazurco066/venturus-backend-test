// Dependencies
import { differenceBetweenDates } from '../utils'

// Helper
const extractDeviation = (data: Array<any>, avgTimeInDays: number) => {
  const now = Date.now()
  const variation = data.reduce((ac, { created_at }) => {
    const diff = differenceBetweenDates(now, new Date(created_at).getTime())
    return ac + (diff - avgTimeInDays) ** 2
  }, 0) / data.length
  return Math.round(Math.sqrt(variation))
}

// Exporting
export default extractDeviation