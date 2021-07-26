import { DateTime } from 'luxon'
import ObservationsError from './ObservationsError'

const dateTimeToFormat = (date: string): string => {
  switch (date.split(/\-/).length) {
    case 1:
      return DateTime.fromFormat(date, 'yyyy').toFormat('yyyy-MM-dd')

    case 2:
      return DateTime.fromFormat(date, 'yyyy-MM').toFormat('yyyy-MM-dd')

    case 3:
      return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('yyyy-MM-dd')
  
    default:
      throw new ObservationsError({
        message: `Invalid date format ${date}`,
        statusCode: 400,
      })
  }
}

export default dateTimeToFormat