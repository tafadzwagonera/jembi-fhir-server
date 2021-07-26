import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EffectivePeriods extends BaseSchema {
  protected tableName = 'effective_periods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('start')
      table.dateTime('end')
      table.integer('observation_id').unsigned().references('observations.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
