const error = (response: any): any => {
  const { message, name } = response

  return {
    source: 'observations',
    message,
    name, 
  }
}

export default error