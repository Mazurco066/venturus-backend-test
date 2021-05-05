// Nest Libs
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GithubController } from './controllers'
import { GithubRepository, GithubRepositoryProvider } from './repository'
import { CommandHandlers } from './commands/handlers'
import { MongooseModule } from '@nestjs/mongoose'
import { QueryHandlers } from './queries/handlers'
import { GithubService } from './services'
import { SearchTrack, SearchTrackSchema } from './schema'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: SearchTrack.name,
      schema: SearchTrackSchema
    }]),
    CqrsModule
  ],
  controllers: [
    GithubController
  ],
  providers: [
    GithubRepository,
    GithubRepositoryProvider,
    GithubService,
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [
    GithubRepositoryProvider
  ]
})
export class GithubModule {}
