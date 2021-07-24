import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quantities extends BaseSchema {
  protected tableName = 'quantities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('value')
      table.enu('comparator', ['<', '<=', '>=', '>'], {
        useNative: false,
        enumName: 'comparator',
        existingType: false,
      })

      table.string('unit')
      table.string('system')
      table.string('code')

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

