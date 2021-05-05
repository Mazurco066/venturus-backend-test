// Dependencies
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/modules/app.module'

// E2E Tests
describe('AppController (e2e)', () => {
  let app: INestApplication

  // Init App Module
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // Version endpoing (online)
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  })
})