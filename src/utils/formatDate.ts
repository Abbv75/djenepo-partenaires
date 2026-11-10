import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

export function formatBlogDate(dateStr?: string | null): string {
  if (!dateStr || typeof dateStr !== 'string') return ''

  const trimmed = dateStr.trim()
  if (!trimmed || trimmed === 'Invalid Date') return ''

  const parsed = dayjs(trimmed)
  if (parsed.isValid() && !isNaN(parsed.toDate().getTime())) {
    return parsed.format('D MMMM YYYY')
  }

  return trimmed
}
