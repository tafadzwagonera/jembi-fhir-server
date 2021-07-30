import Observation from '../Models/Observation'

export default (symbol: string) => Observation.query()
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