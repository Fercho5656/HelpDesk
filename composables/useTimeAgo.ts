const DATE_UNITS = {
  month: 2_419_200,
  week: 604_800,
  day: 86_400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSecondsDiff = (timestamp: number) => {
  const now = new Date().getTime()
  return Math.floor((now - timestamp) / 1000)
}

/**
 * It takes a number of seconds and returns an object with a value and unit property. The value is the
 * number of units in the given number of seconds. The unit is the largest unit that can be used to
 * represent the given number of seconds.
 * 
 * For example, if you pass in 3600 seconds, the function will return { value: 1, unit: 'hour' }. If
 * you pass in 86400 seconds, the function will return { value: 1, unit: 'day' }.
 * 
 * The for...of loop iterates over the DATE_UNITS object and assigns the key and value of each entry
 * @param {number} secondsDiff - number - The difference in seconds between the two dates.
 * @returns An object with two properties: value and unit.
 */
const getUnitAndValueDate = (secondsDiff: number): { value: number, unit: string } => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsDiff >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsDiff / secondsInUnit) * -1
      return { value, unit }
    }
  }
  return { value: 0, unit: 'second' }
}

export const useTimeAgo = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat()
  const secondsElapsed = getSecondsDiff(date.getTime())
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}