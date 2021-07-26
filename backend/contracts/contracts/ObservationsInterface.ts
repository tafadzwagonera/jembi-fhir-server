
export interface ObservationErrorInterface {
  message(): string
  statusCode(): number
  name(): string
}

export interface ObservationOkResponse {
  uuid: string
  versionId
}
