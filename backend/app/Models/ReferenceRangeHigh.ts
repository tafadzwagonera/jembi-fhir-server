import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ReferenceRange from './ReferenceRange'

export default class ReferenceRangeHigh extends BaseModel {
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

  @column({ columnName: 'reference_range_id', serializeAs: null })
  public referenceRangeId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => ReferenceRange)
  public observation: BelongsTo<typeof ReferenceRange>
}
