// Types
export interface IPipeResponse {
  status: {
    code: number
    message: string
  }
  [propName: string]: any
}

// Helper
export default (
  statusCode: number,
  statusmessage: string,
  currentParameter = {},
  newObject = {},
  messageList = []
): IPipeResponse => {
  const message = `${statusmessage}${(messageList.length > 0 ? ': ' + messageList.join(' | ') : '')}`
  return {
    ...currentParameter,
    ...{
      status: {
        code: statusCode,
        message: message
      },
      ...newObject
    }
  }
}