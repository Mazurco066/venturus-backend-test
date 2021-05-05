// Dependencies
import { getDatesBetweenPeriod } from '../utils'

// Utils
const extractTrackedIssues = (projectsIssues: object) => {

  const projectsIssuesTrackedPerDay = {}
  Object.keys(projectsIssues).forEach((key) => {

    // Obtain date range between first and last issue
    const day0 = new Date(projectsIssues[key][0].created_at)
    const datesRange = getDatesBetweenPeriod(new Date(day0), new Date())

    // Get number of issues by day
    const dailyIssues = datesRange.map((date) => {
      const numberOfIssues = projectsIssues[key].filter(
        ({ created_at }) => new Date(created_at) <= date
      ).length
      return { date, numberOfIssues }
    })

    // Add to object literals for returning
    projectsIssuesTrackedPerDay[key] = {
      totalIssues: dailyIssues.reduce((pv, { numberOfIssues }) => pv + numberOfIssues ,0),
      dailyIssues
    }
  })

  return projectsIssuesTrackedPerDay
}

// Named export
export default extractTrackedIssues