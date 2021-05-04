// Nest Libs
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

// Controllers
import { GithubController } from './controllers'

// Providers

// Commands
import { CommandHandlers } from './commands/handlers'

// Queries
import { QueryHandlers } from './queries/handlers'

// Services

// Envs
import { options } from 'src/common/configs'

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [
    GithubController
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers
  ]
})
export class GithubModule {}
