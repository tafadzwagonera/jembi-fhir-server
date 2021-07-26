import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Codes extends BaseSchema {
  protected tableName = 'codes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('text')
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
