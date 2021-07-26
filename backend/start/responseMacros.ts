/* eslint-disable func-names */

import Env from '@ioc:Adonis/Core/Env'
import Response from '@ioc:Adonis/Core/Response'
import { error, ok } from '../app/Helpers'
const production: string = 'production'

Response.macro('error', function (request, response) {
  const { statusCode, error: { message, name } } = response

  if (Env.get('NODE_ENV') === production) {
    console.error(`${request.header('X-Request-Id', 'No X-Request-Id')} :${JSON.stringify({ name, message, })}`)
  }

  return this.status(statusCode).send(error(response))
})

Response.macro('success', function (request, response) {
  const { statusCode, uuid, versionId } = response

  if (Env.get('NODE_ENV') === production) {
    console.info(`${request.header('X-Request-Id', 'No X-Request-Id')} :${JSON.stringify({ uuid, versionId, })}`)
  }

  return this.status(statusCode).send(ok(response))
})
