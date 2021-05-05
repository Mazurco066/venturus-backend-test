// Dependencies 
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { SearchTrack } from '../schema'
import { GithubRepository } from '../repository'

// Unit tests
describe('GithubRepository', () => {
  let repository: GithubRepository
  const searchTrackModel = new SearchTrack()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubRepository,
        {
          provide: getModelToken(SearchTrack.name),
          useValue: searchTrackModel
        }
      ]
    }).compile()

    repository = module.get<GithubRepository>(GithubRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})