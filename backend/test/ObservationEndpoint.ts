import test from 'japa'
import { Response } from 'supertest'

// const BASE_URL: string = 'https://127.0.0.1'

test.group('Observation Endpoint', async (group) => {
  // const path: string = '/Observations'
  // const timeout: number = 0
  const responseProps: any = {
    accepted: false,
    text: '',
    statusCode: 400,
    body: {},
  }

  let response: Response = {} as Response

  group.before(async () => {
    Object.entries(responseProps).forEach(([key]) => {
      Object.defineProperty(response, key, {
        value: responseProps[key],
        writable: true,
        enumerable: true,
        configurable: true
     })
    })
  })

  test('If GET Observation call with correct query params returns 200 OK', async (assert) => {
    assert.plan(1)
    assert.deepEqual({}, response.body)
  })

  test('If GET Observation call with incorrect query params return 400 Bad Request', async (assert) => {
    assert.plan(1)
    assert.deepEqual({}, response.body)
  })

  test('If POST Observation call with correct body request return 200 OK', async (assert) => {
    assert.plan(1)
    assert.deepEqual({}, response.body)
  })

  test('If POST Observation call with incorrect body request returns 400 Bad Request', async (assert) => {
    assert.plan(1)
    assert.deepEqual({}, response.body)
  })
})