import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DomainResources extends BaseSchema {
  protected tableName = 'domain_resources'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique()
      table
        .enu('resourceType', ['Observation'], {
          useNative: false,
          existingType: false,
          enumName: 'resource_type',
        })
        .defaultTo('Observation')

      table.string('status')
      table.text('div')
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
