// Utils
const getDatesBetweenPeriod = (initialDate: Date, finalDate: Date) => {
  const array = []

  // Adding each date as array item to calc issues by day
  for (let i = initialDate; i <= finalDate; i.setDate(i.getDate() + 1)) array.push(new Date(i))
  return array
}

// Named export
export default getDatesBetweenPeriod