import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import DomainResource from './DomainResource'
import Identifier from './Identifier'
import Code from './Code'
import EffectivePeriod from './EffectivePeriod'
import ValueQuantity from './ValueQuantity'
import Interpretation from './Interpretation'
import ReferenceRange from './ReferenceRange'

export default class Observation extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @hasOne(() => DomainResource)
  public text: HasOne<typeof DomainResource>

  @column({ columnName: 'resource_type', serializeAs: 'resourceType' })
  public resourceType: string

  @column()
  public status: string

  @column()
  public issued: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Identifier)
  public identifiers: HasMany<typeof Identifier>

  @hasOne(() => Code)
  public code: HasOne<typeof Code>

  @hasOne(() => EffectivePeriod)
  public effectivePeriod: HasOne<typeof EffectivePeriod>

  @hasOne(() => ValueQuantity)
  public valueQuantity: HasOne<typeof ValueQuantity>

  @hasMany(() => Interpretation)
  public interpretation: HasMany<typeof Interpretation>

  @hasOne(() => ReferenceRange)
  public referenceRange: HasOne<typeof ReferenceRange>
}
