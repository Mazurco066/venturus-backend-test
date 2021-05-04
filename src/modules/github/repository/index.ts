// Nest Libs
import { Provider } from '@nestjs/common'

// Repository
import { GithubRepository, IGithubRepository } from './github.repository'

// Custom Providers
const GithubRepositoryProvider: Provider = {
  provide: 'GithubRepo',
  useClass: GithubRepository
}


export {
  IGithubRepository,
  GithubRepository,
  GithubRepositoryProvider
}