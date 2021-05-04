// Nest Libs
import { Module, OnModuleInit, Controller, Get, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Helpers
import { baseResponse } from '../helpers'

// Configuration
import { options } from '../common/configs'

// Modules
import { GithubModule } from './github/github.module'

// Dotenv
import { config } from 'dotenv'

// API Version
const pj = readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')
const { version } = JSON.parse(pj)

// Dotenv fetch
config()

// Root Controller
@ApiTags('Version')
@Controller()
class RootController {
  @Get()
  @ApiOperation({ summary: 'API Version', description: 'Returns current API Version' })
  @ApiResponse({ status: 200, description: 'Return the version number inside status object' })
  getVersion(@Res() res) {
    res.status(200).send(
      baseResponse(200, `Venturus Backend Test - version: ${version}`)
    )
  }
}

// Module
@Module({
  imports: [ GithubModule ],
  controllers: [ RootController ]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    console.log('App module is running')
  }
}
