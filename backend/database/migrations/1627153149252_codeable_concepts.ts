import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CodeableConcepts extends BaseSchema {
  protected tableName = 'codeable_concepts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('coding').unsigned()
      table.string('text')
      table.foreign('coding').references('codings.id').onDelete('CASCADE')

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