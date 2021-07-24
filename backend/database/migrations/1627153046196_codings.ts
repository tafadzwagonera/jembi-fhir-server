import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Codings extends BaseSchema {
  protected tableName = 'codings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('system')
      table.string('version')
      table.string('code')
      table.string('display')
      table.boolean('userSelected')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
