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