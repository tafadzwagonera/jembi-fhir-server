import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Interpretation from './Interpretation'

export default class InterpretationCoding extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public system: string

  @column()
  public version: string

  @column()
  public symbol: string

  @column()
  public display: string

  @column({ columnName: 'user_selected', serializeAs: null })
  public userSelected: string

  @column({ columnName: 'interpretation_id', serializeAs: null })
  public interpretationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Interpretation)
  public interpretation: BelongsTo<typeof Interpretation>
}
