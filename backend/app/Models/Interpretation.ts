import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Observation from './Observation'
import InterpretationCoding from './InterpretationCoding'

export default class Interpretation extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ columnName: 'observation_id', serializeAs: null })
  public observationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Observation)
  public observation: BelongsTo<typeof Observation>

  @hasMany(() => InterpretationCoding)
  public coding: HasMany<typeof InterpretationCoding>
}
