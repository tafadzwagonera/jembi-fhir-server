import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Code from './Code'

export default class CodeCoding extends BaseModel {
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

  @column({ columnName: 'user_selected', serializeAs: 'userSelected' })
  public userSelected: string

  @column({ columnName: 'code_id', serializeAs: null })
  public codeId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Code)
  public code: BelongsTo<typeof Code>
}
