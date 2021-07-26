import { ObservationErrorInterface } from '../../contracts/interfaces/ObservationsInterface'

export default class ObservationsError extends Error implements ObservationErrorInterface {
  private error

  constructor(error) {
    super(error.message)
    this.error = error
    this.error.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
  }

  public get message() {
    return this.error.message
  }

  public get statusCode() {
    return this.error.statusCode
  }

  public get name() {
    return this.error.name
  }
}