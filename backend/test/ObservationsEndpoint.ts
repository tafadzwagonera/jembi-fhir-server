import test from 'japa'
import supertest from 'supertest'

const BASE_URL: string = 'https://127.0.0.1/v1'

test.group('Observations Endpoint', async () => {
  const path: string = '/Observations'
  const timeout: number = 0

  test('If POST Observation call with incorrect body request returns 400 Bad Request', async (assert) => {
    assert.plan(1)
    const requestBodyWithoutRequiredAttrs: any = {
      "identifier": [
        {
          "use": "official",
          "system": "http://www.bmc.nl/zorgportal/identifiers/observations",
          "value": "6325"
        }
      ],
      "effectivePeriod": {
        "start": "2013-04-02T10:30:10+01:00",
        "end": "2013-04-05T10:30:10+01:00"
      },
      "issued": "2013-04-03T15:30:10+01:00",
      "valueQuantity": {
        "value": 6.2,
        "unit": "kPa",
        "system": "http://unitsofmeasure.org",
        "code": "kPa"
      }
    }

    const response = await supertest(BASE_URL)
      .post(path)
      .set({ 'Content-Type': 'application/json' })
      .send(requestBodyWithoutRequiredAttrs)
    assert.equal(400, response.statusCode)
  }).timeout(timeout)
})
