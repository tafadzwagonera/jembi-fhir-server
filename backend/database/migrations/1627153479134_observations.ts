import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Observations extends BaseSchema {
  protected tableName = 'observations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('resourceType').defaultTo('Observation')
      table.integer('identifier').unsigned()
      table.string('status')
      table.integer('code').unsigned()
      table.dateTime('effectiveDateTime')
      table.integer('effectivePeriod').unsigned()
      table.dateTime('issued')
      table.integer('valueQuantity').unsigned()
      table.integer('valueCodeableConcept').unsigned()
      table.string('valueString')
      table.boolean('valueBoolean')
      table.integer('valueInteger')
      table.integer('interpretation').unsigned()
      table.integer('referenceRange').unsigned()
      table.foreign('identifier').references('identifiers.id').onDelete('CASCADE')
      table.foreign('code').references('codings.id').onDelete('CASCADE')
      table.foreign('effectivePeriod').references('periods.id').onDelete('CASCADE')
      table.foreign('valueQuantity').references('quantities.id').onDelete('CASCADE')
      table.foreign('valueCodeableConcept').references('codeable_concepts.id').onDelete('CASCADE')
      table.foreign('interpretation').references('interpretations.id').onDelete('CASCADE')
      table.foreign('referenceRange').references('reference_ranges.id').onDelete('CASCADE')

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
