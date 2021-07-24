// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObservationsController {
  public async create({ response }) {
    return response.status(200).json({ statusCode: 200, statusText: 'OK', method: 'POST /Observations' })
  }

  public async show({ response }) {
    return response.status(200).json({ statusCode: 200, statusText: 'OK', method: 'GET /Observations/:id' })
  }

  public async update({ response }) {
    return response.status(200).json({ statusCode: 200, statusText: 'OK', method: 'PUT, PATCH /Observations' })
  }
}
