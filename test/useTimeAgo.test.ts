import { expect, test } from 'vitest'
import { useTimeAgo } from '../composables/useTimeAgo'

const MILLISECOND_UNITS = {
  month: 2629746000,
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
}

test('useTimeAgo should return the exact time ago if the time is precise', () => {
  const today = new Date()
  const aSecondAgo = new Date(today.getTime() - MILLISECOND_UNITS.second)
  const aMinuteAgo = new Date(today.getTime() - MILLISECOND_UNITS.minute)
  const anHourAgo = new Date(today.getTime() - MILLISECOND_UNITS.hour)
  const aDayAgo = new Date(today.getTime() - MILLISECOND_UNITS.day)
  const aWeekAgo = new Date(today.getTime() - MILLISECOND_UNITS.week)
  const aMonthAgo = new Date(today.getTime() - MILLISECOND_UNITS.month)

  expect(useTimeAgo(aSecondAgo)).toBe('hace 1 segundo' || '1 second ago')
  expect(useTimeAgo(aMinuteAgo)).toBe('hace 1 minuto' || '1 minute ago')
  expect(useTimeAgo(anHourAgo)).toBe('hace 1 hora' || '1 hour ago')
  expect(useTimeAgo(aDayAgo)).toBe('hace 1 día' || '1 day ago')
  expect(useTimeAgo(aWeekAgo)).toBe('hace 1 semana' || '1 week ago')
  expect(useTimeAgo(aMonthAgo)).toBe('hace 1 mes' || '1 month ago')
})

test('useTimeAgo should return the time ago in the largest unit', () => {
  const today = new Date()
  const aMinuteAndAHalfAgo = new Date(today.getTime() - MILLISECOND_UNITS.minute - MILLISECOND_UNITS.second * 30)
  const anHourAndAHalfAgo = new Date(today.getTime() - MILLISECOND_UNITS.hour - MILLISECOND_UNITS.minute * 30)
  const aDayAndAHalfAgo = new Date(today.getTime() - MILLISECOND_UNITS.day - MILLISECOND_UNITS.hour * 12)
  const aWeekAndAHalfAgo = new Date(today.getTime() - MILLISECOND_UNITS.week - MILLISECOND_UNITS.day * 3)
  const aMonthAndAHalfAgo = new Date(today.getTime() - MILLISECOND_UNITS.month - MILLISECOND_UNITS.week * 2)

  expect(useTimeAgo(aMinuteAndAHalfAgo)).toBe('hace 1 minuto' || '1 minute ago')
  expect(useTimeAgo(anHourAndAHalfAgo)).toBe('hace 1 hora' || '1 hour ago')
  expect(useTimeAgo(aDayAndAHalfAgo)).toBe('hace 1 día' || '1 day ago')
  expect(useTimeAgo(aWeekAndAHalfAgo)).toBe('hace 1 semana' || '1 week ago')
  expect(useTimeAgo(aMonthAndAHalfAgo)).toBe('hace 1 mes' || '1 month ago')
})

test.skip('useTimeAgo should return a formated date if time ago is greater than one month', () => {
  const today = new Date()
  const twoMonthsAgo = new Date(today.getTime() - MILLISECOND_UNITS.month * 2)
  const sixMonthsAgo = new Date(today.getTime() - MILLISECOND_UNITS.month * 6)
  const aYearAgo = new Date(today.getTime() - MILLISECOND_UNITS.month * 12)
  const twoYearsAgo = new Date(today.getTime() - MILLISECOND_UNITS.month * 24)

  expect(useTimeAgo(twoMonthsAgo)).toBe('hace 2 meses' || '2 months ago')
  expect(useTimeAgo(sixMonthsAgo)).toBe('hace 6 meses' || '6 months ago')
  expect(useTimeAgo(aYearAgo)).toBe('hace 1 año' || '1 year ago')
  expect(useTimeAgo(twoYearsAgo)).toBe('hace 2 años' || '2 years ago')
})