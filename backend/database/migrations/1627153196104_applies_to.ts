import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AppliesTos extends BaseSchema {
  protected tableName = 'applies_to'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('codeable_concept_id').unsigned()
      table.foreign('codeable_concept_id').references('codeable_concepts.id').onDelete('CASCADE')

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