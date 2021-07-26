import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Identifiers extends BaseSchema {
  protected tableName = 'identifiers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('use', ['usual', 'official', 'temp', 'secondary', 'old'], {
        useNative: false,
        existingType: false,
        enumName: 'identifier_use',
      })

      table.string('system')
      table.string('value')
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
