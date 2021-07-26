
export interface ObservationErrorInterface {
  message(): string
  statusCode(): number
  name(): string
}

export interface ObservationOkResponse {
  statusCode: number
  uuid?: string
  versionId?: string
  data?: any
}
