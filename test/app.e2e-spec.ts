// Dependencies
import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import * as request from 'supertest'
import { AppModule } from './../src/modules/app.module'

// Jest timeout
jest.setTimeout(20000)

// E2E Tests
describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  // Init App Module
  beforeEach(async () => {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        trustProxy: true
      })
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  // Version endpoint (online)
  it('/v1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200, {
        status: {
          code: 200,
          message: 'Venturus Backend Test - version: 1.0.0'
        }
      })
      .expect('Content-Type', /json/)
  })
})

describe('GithubController (e2e)', () => {
  let app: NestFastifyApplication

  // Init App Module
  beforeEach(async () => {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        trustProxy: true
      })
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  // Consilidation endpoint (online)
  it('/v1/github/repoMetrics (GET)', () => {
    return request(app.getHttpServer())
      .get('/github/repoMetrics?repo=react')
      .expect(200)
      .expect('Content-Type', /json/)
  })
})