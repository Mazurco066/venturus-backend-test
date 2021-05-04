import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common'
import { baseResponse } from 'src/helpers'

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    // Get request info
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    const { message }: any = exception.getResponse()
    
    // Return formatted response
    response.status(status).send(
      baseResponse(status, 'Validation errors!', message)
    )
  }
}