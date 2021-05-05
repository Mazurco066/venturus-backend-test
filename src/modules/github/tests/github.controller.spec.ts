// Dependencies 
import { Test, TestingModule } from '@nestjs/testing'
import { QueryBus } from '@nestjs/cqrs'
import { GithubController } from '../controllers'
import { GithubService } from '../services'

// Unit tests
describe('GithubController', () => {
  let controller: GithubController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubController,
        GithubService,
        QueryBus
      ]
    }).compile()

    controller = module.get<GithubController>(GithubController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})