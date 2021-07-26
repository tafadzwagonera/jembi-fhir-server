const ok = (response: any): any => {
  const { uuid, versionId, data } = response

  return {
    source: 'observations',
    uuid,
    versionId,
    data,
  }
}

export default ok