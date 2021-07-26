import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Observation from './Observation'

export default class DomainResource extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public resourceType: string

  @column()
  public status: string

  @column()
  public div: string

  @column({ columnName: 'observation_id', serializeAs: null })
  public observationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Observation)
  public observation: BelongsTo<typeof Observation>
}
