import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Identifiers extends BaseSchema {
  protected tableName = 'identifiers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('use', ['usual', 'official', 'temp', 'secondary', 'old'], {
        useNative: false,
        enumName: 'status',
        existingType: false,
      })

      table.integer('type').unsigned()
      table.string('system')
      table.string('value')
      table.integer('period').unsigned()
      table.foreign('type').references('codeable_concepts.id').onDelete('CASCADE')
      table.foreign('period').references('periods.id').onDelete('CASCADE')

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

