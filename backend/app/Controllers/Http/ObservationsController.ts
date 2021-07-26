import { DateTime } from 'luxon'
import _ from 'lodash'
import uuid4 from 'uuid4'
import Observation from '../../Models/Observation'
import Code from '../../Models/Code'
import Interpretation from '../../Models/Interpretation'
import ReferenceRange from '../../Models/ReferenceRange'
import { ObservationOkResponse } from '../../../contracts/interfaces/ObservationsInterface'
import ObservationsError from '../../Helpers/ObservationsError'
import dateTimeToFormat from '../../Helpers/dateTimeToFormat'
import isEmpty from '../../Helpers/isEmpty'

export default class ObservationsController {
  public async create({ response, request }) {
    const id: string = uuid4()
    const { 
      identifier, 
      status, 
      code: { text: codeText, coding: codeCoding }, 
      effectivePeriod, 
      issued, 
      valueQuantity, 
      interpretation: { coding: interpretationCoding }, 
      referenceRange: [values, ],
    } = request.all()

    if (isEmpty(status)) {
      return response.error(request, new ObservationsError({
        message: 'Missing status property in request body',
        statusCode: 400,
      }))
    }

    if (_.isEmpty(codeCoding)) {
      return response.error(request, new ObservationsError({
        message: 'Missing coding property in request body',
        statusCode: 400,
      }))
    }

    const observation: any = await Observation.create({
      resourceType: 'Observation',
      status: (status || 'unknown'),
      issued: (issued || DateTime.now().toString()),
    })

    await observation.related('text').create({
      id,
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative with Details</b></p> ... </div>',
    })

    if (_.isArray(identifier) && identifier.length >= 1) {
      await observation.related('identifiers').createMany(identifier)
    }

    const code: any = new Code()

    if (codeText && codeText.trim().length > 0) code.text = codeText
    if (_.isArray(codeCoding) && codeCoding.length >= 1) {
      await code.related('codeCodings').createMany(codeCoding)
    }

    await observation.related('code').save(code)

    if (!_.isEmpty(effectivePeriod)) {
      await observation.related('effectivePeriod').create(effectivePeriod)
    }

    if (!_.isEmpty(valueQuantity)) {
      await observation.related('valueQuantity').create({
        value: 6.2,
        unit: 'kPa',
        system: 'http://unitsofmeasure.org',
        code: 'kPa',
      })
    }

    const interpretation: any = new Interpretation()
    if (_.isArray(interpretationCoding) && interpretationCoding.length >= 1) {
      await interpretation.related('coding').createMany(interpretationCoding)
    }

    await observation.related('interpretation').save(interpretation)

    const referenceRange: any = new ReferenceRange()
    const { text: referenceRangeText, low, high } = values

    if (referenceRangeText && referenceRangeText.trim().length > 0) referenceRange.text =  referenceRangeText
    if (!_.isEmpty(low)) {
      await referenceRange.related('low').create({
        value: 4.8,
        unit: 'kPa',
        system: 'http://unitsofmeasure.org',
        code: 'kPa',
      })
    }

    if (!_.isEmpty(high)) {
      await referenceRange.related('high').create({
        value: 6.0,
        unit: 'kPa',
        system: 'http://unitsofmeasure.org',
        code: 'kPa',
      })
    }

    await observation.related('referenceRange').save(referenceRange)

    return response.ok(request, {
      statusCode: 200,
      uuid: id,
      versionId: ''
    } as ObservationOkResponse)
  }

  public async show({ response, request }) {
    /**
     * A date, or partial date (e.g. just year or year + month) as used in human communication. 
     * The format is YYYY, YYYY-MM, or YYYY-MM-DD, e.g. 2018, 1973-06, or 1905-08-23. 
     */
    const { code, date } = request.qs()
    if (!(code || date)) {
      return response.error(request, new ObservationsError({
        message: 'Missing category, code or date query parameter',
        statusCode: 400,
      }))
    }

    let start: string = ''
    let end: string = ''

    if (_.isArray(date)) {
      [start, end] = date
    }

    const observations: any = await Observation.query()
      .preload('text')
      .preload('identifiers')
      .preload('code', (query) => {
        if (code) {
          query.preload('codeCodings', (codeCodingsQuery) => {
            codeCodingsQuery.where('symbol', '=', code)
          })
        }
      })
      .preload('effectivePeriod', (query) => {
        if (start) {
          query
          .where('start', '>=', dateTimeToFormat(start))
        }

        if (start && end) {
          query
          .where('start', '>=', dateTimeToFormat(start))
          .where('end', '<=', dateTimeToFormat(end))
        }
      })
      .preload('valueQuantity')
      .preload('interpretation', (query) => {
        query.preload('coding')
      })
      .preload('referenceRange', (query) => {
        query.preload('low')
        query.preload('high')
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

    return response.ok(request, {
      statusCode: 200,
      data: observations.map((observation) => observation.serialize(serializeOptions))
    })
  }

  public async update({ response, request }) {
    return response.ok(request, {
      statusCode: 200,
      uuid: uuid4(),
      versionId: '',
      data: 'PATCH, PUT',
    })
  }
}
