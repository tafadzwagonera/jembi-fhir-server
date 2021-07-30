import Observation from '../Models/Observation'
import dateTimeToFormat from './dateTimeToFormat'

export default (
  symbol: string, 
  start: string, 
  end: string
) => Observation.query()
  .preload('text')
  .preload('identifiers')
  .preload('code', (query) => {
    query.preload('coding')
  })
  .preload('effectivePeriod')
  .preload('valueQuantity')
  .preload('interpretation', (query) => {
    query.preload('coding')
  })
  .preload('referenceRange', (query) => {
    query.preload('low')
    query.preload('high')
  })
  .whereHas('code', (query) => {
    query.whereHas('coding', (codingQuery) => {
      codingQuery.where('symbol', '=', symbol)
    })
  })
  .whereHas('effectivePeriod', (query) => {
    if (start && end) {
      query
      .where('start', '>=', dateTimeToFormat(start))
      .where('end', '<=', dateTimeToFormat(end))
    } else if (start) {
      query
      .where('start', '>=', dateTimeToFormat(start))
    }
  })