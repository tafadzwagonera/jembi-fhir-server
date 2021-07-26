import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InterpretationCodes extends BaseSchema {
  protected tableName = 'interpretation_codings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('system')
      table.string('version')
      table.string('symbol')
      table.string('display')
      table.string('user_selected')
      table.integer('interpretation_id').unsigned().references('interpretations.id').onDelete('CASCADE')
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
