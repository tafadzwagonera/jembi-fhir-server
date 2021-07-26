import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Codings extends BaseSchema {
  protected tableName = 'code_codings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('system')
      table.string('version')
      table.string('symbol')
      table.string('display')
      table.string('user_selected')
      table.integer('code_id').unsigned().references('codes.id').onDelete('CASCADE')

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
