import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Observations extends BaseSchema {
  protected tableName = 'observations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('resource_type').defaultTo('Observation')
      table.enu('status', ['registered', 'preliminary', 'final', 'amended'], {
        useNative: false,
        existingType: false,
        enumName: 'observation_status',
      })

      table.dateTime('issued')

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
