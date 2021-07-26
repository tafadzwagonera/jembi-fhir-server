import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Observation from './Observation'
import ReferenceRangeLow from './ReferenceRangeLow'
import ReferenceRangeHigh from './ReferenceRangeHigh'

export default class ReferenceRange extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public text: string

  @column({ columnName: 'observation_id', serializeAs: null })
  public observationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Observation)
  public observation: BelongsTo<typeof Observation>

  @hasOne(() => ReferenceRangeLow)
  public low: HasOne<typeof ReferenceRangeLow>

  @hasOne(() => ReferenceRangeHigh)
  public high: HasOne<typeof ReferenceRangeHigh>
}
