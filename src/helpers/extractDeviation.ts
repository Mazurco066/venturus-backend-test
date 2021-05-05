// Dependencies
import { differenceBetweenDates } from '../utils'

// Helper
const extractDeviation = (data: Array<any>, avgTimeInDays: number) => Math.round(Math.sqrt(
  data.reduce((ac, { created_at }) => {
    const diff = differenceBetweenDates(Date.now(), new Date(created_at).getTime())
    return ac + (diff - avgTimeInDays) ** 2
  }, 0) / data.length
))

// Exporting
export default extractDeviation