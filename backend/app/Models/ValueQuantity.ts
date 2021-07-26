import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Observation from './Observation'

export default class ValueQuantity extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public value: number

  @column()
  public comparator: string

  @column()
  public unit: string

  @column()
  public system: string

  @column()
  public code: string

  @column({ columnName: 'observation_id', serializeAs: null })
  public observationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Observation)
  public observation: BelongsTo<typeof Observation>
}
