import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ValueQuantities extends BaseSchema {
  protected tableName = 'value_quantities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('value')
      table.enu('comparator', ['<', '<=', '>=', '>'], {
        useNative: false,
        existingType: false,
        enumName: 'value_quantity_comparator',
      })

      table.string('unit')
      table.string('system')
      table.string('code')
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
