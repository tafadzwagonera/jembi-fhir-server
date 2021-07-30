import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Observation from './Observation'
import CodeCoding from './CodeCoding'

export default class Code extends BaseModel {
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

  @hasMany(() => CodeCoding)
  public coding: HasMany<typeof CodeCoding>
}
