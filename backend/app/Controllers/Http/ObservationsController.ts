import { DateTime } from 'luxon'
import uuid4 from 'uuid4'
import Observation from '../../Models/Observation'
import Code from '../../Models/Code'
import Interpretation from '../../Models/Interpretation'
import ReferenceRange from '../../Models/ReferenceRange'
// curl -L -X POST 'http://127.0.0.1:3333/v1/Observations' && echo
// curl -L -X GET 'http://127.0.0.1:3333/v1/Observations' && echo
// history -c && history -w

export default class ObservationsController {
  public async create({ response }) {
    const issued: any = DateTime.now().toString()
    const id: string = uuid4()

    const observation: any = await Observation.create({
      resourceType: 'Observation',
      status: 'preliminary',
      issued,
    })

    await observation.related('text').create({
      id,
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p> ... </div>',
    })

    await observation.related('identifiers').createMany([
      {
        use: 'official',
        system: 'http://www.bmc.nl/zorgportal/identifiers/observations',
        value: '6325',
      },
    ])

    const code: any = new Code()
    code.text = 'Negative for Chlamydia Trachomatis rRNA'

    await code.related('codeCodings').createMany([
      {
        system: 'http://snomed.info/sct',
        symbol: '260385009',
        display: 'Negative',
      },
      {
        system: 'https://acme.lab/resultcodes',
        symbol: 'NEG',
        display: 'Negative',
      },
    ])

    await observation.related('code').save(code)

    await observation.related('effectivePeriod').create({
      start: '2013-04-02T10:30:10+01:00',
      end: '2013-04-05T10:30:10+01:00',
    })

    await observation.related('valueQuantity').create({
      value: 6.2,
      unit: 'kPa',
      system: 'http://unitsofmeasure.org',
      code: 'kPa',
    })

    const interpretation: any = new Interpretation()

    await interpretation.related('coding').createMany([
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        symbol: 'H',
        display: 'High',
      },
    ])

    await observation.related('interpretation').save(interpretation)

    const referenceRange: any = new ReferenceRange()
    referenceRange.text = 'Text'

    await referenceRange.related('low').create({
      value: 4.8,
      unit: 'kPa',
      system: 'http://unitsofmeasure.org',
      code: 'kPa',
    })

    await referenceRange.related('high').create({
      value: 6.0,
      unit: 'kPa',
      system: 'http://unitsofmeasure.org',
      code: 'kPa',
    })

    await observation.related('referenceRange').save(referenceRange)

    return response.status(200).json({ statusCode: 200, statusText: 'OK', method: 'POST /Observations', data: '' })
  }

  public async show({ response }) {
    const observations: any = await Observation.query()
      .preload('text')
      .preload('identifiers')
      .preload('code')
      .preload('effectivePeriod')
      .preload('valueQuantity')
      .preload('interpretation', (interpretationQuery) => {
        interpretationQuery.preload('coding')
      })
      .preload('referenceRange', (referenceRangeQuery) => {
        referenceRangeQuery.preload('low')
        referenceRangeQuery.preload('high')
      })

    const serializeOptions: any = {
      fields: {
        pick: ['resourceType', 'status', 'issued'],
      },
      relations: {
        text: {
          pick: ['id', 'status', 'div'],
        },
        identifiers: {
          fields: {
            pick: ['use', 'system', 'value'],
          },
        },
        code: {
          fields: {
            pick: ['text'],
          },
        },
      },
    }

    const observationsJSON: JSON = observations.map((observation) => observation.serialize(serializeOptions))

    return response
      .status(200)
      .json({ statusCode: 200, statusText: 'OK', method: 'GET /Observations/:id', data: observationsJSON })
  }

  public async update({ response }) {
    return response
      .status(200)
      .json({ statusCode: 200, statusText: 'OK', method: 'PUT, PATCH /Observations', data: '' })
  }
}
