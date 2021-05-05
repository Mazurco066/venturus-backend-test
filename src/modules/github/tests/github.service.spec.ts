// Dependencies 
import { Test, TestingModule } from '@nestjs/testing'
import { QueryBus } from '@nestjs/cqrs'
import { GithubService } from '../services'

// Unit tests
describe('GithubService', () => {
  let service: GithubService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        QueryBus
      ]
    }).compile()

    service = module.get<GithubService>(GithubService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})