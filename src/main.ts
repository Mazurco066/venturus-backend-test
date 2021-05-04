// Libs
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import fastifyCors from 'fastify-cors'

// Module
import { AppModule } from './modules/app.module'

// Configs
import { options } from './common/configs'
import { BadRequestFilter } from './common/filters'

const bootstrap = async () => {
  // Nest fastfy app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      logger: true
    })
  )
  
  // Validations
  const validationOptions = {
    skipMissingProperties: false,
    validationError: { target: false },
    validateCustomDecorators: true
  }
  
  // Globals
  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.useGlobalFilters(new BadRequestFilter())
  app.setGlobalPrefix(options.PREFIX)
  
  // Middlewares
  app.register(fastifyCors, { origin: true })
  
  // Swagger setup
  const swaggerOptions = new DocumentBuilder()
    .setTitle(options.TITLE)
    .setDescription(options.DESCRIPTION)
    .setVersion(options.VERSION)
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup(options.API_EXPLORER_PATH, app, document)

  // Instance
  await app.listen(options.PORT, options.HOST)
  Logger.log(
    'Listening at http://localhost:' + options.PORT + '/' + options.PREFIX
  )
}

bootstrap()
