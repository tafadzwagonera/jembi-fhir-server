import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ReferenceRanges extends BaseSchema {
  protected tableName = 'reference_ranges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('low').unsigned()
      table.integer('high').unsigned()
      table.integer('type').unsigned()
      table.integer('appliesTo').unsigned()
      table.string('text')
      table.foreign('low').references('quantities.id').onDelete('CASCADE')
      table.foreign('high').references('quantities.id').onDelete('CASCADE')
      table.foreign('type').references('codeable_concepts.id').onDelete('CASCADE')
      table.foreign('appliesTo').references('applies_to.id').onDelete('CASCADE')

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
