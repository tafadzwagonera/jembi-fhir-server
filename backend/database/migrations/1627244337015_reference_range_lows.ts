import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ReferenceRangeLows extends BaseSchema {
  protected tableName = 'reference_range_lows'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('value')
      table.enu('comparator', ['<', '<=', '>=', '>'], {
        useNative: false,
        existingType: false,
        enumName: 'reference_range_low_comparator',
      })

      table.string('unit')
      table.string('system')
      table.string('code')
      table.integer('reference_range_id').unsigned().references('reference_ranges.id').onDelete('CASCADE')

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
