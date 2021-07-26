/* eslint-disable func-names */

import Env from '@ioc:Adonis/Core/Env'
import Response from '@ioc:Adonis/Core/Response'
import ok from '../app/Helpers/ok'
import error from '../app/Helpers/error'
const production: string = 'production'

Response.macro('error', function (request: any, response: any): any {
  const { statusCode, error: { message, name } } = response

  if (Env.get('NODE_ENV') === production) {
    console.error(`${request.header('X-Request-Id', 'No X-Request-Id')} :${JSON.stringify({ name, message, })}`)
  }

  return this.status(statusCode).send(error(response))
})

Response.macro('ok', function (request: any, response: any): any {
  const { statusCode, uuid, versionId } = response

  if (Env.get('NODE_ENV') === production) {
    console.info(`${request.header('X-Request-Id', 'No X-Request-Id')} :${JSON.stringify({ uuid, versionId, })}`)
  }

  return this.status(statusCode).send(ok(response))
})
