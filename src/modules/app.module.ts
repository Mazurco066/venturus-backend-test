// Dependencies
import { Module, OnModuleInit, Controller, Get, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MongooseModule } from '@nestjs/mongoose'
//import { readFileSync } from 'fs'
//import { resolve } from 'path'
import { baseResponse } from '../helpers'
import { databaseURI } from '../common/configs'
import { config } from 'dotenv'
import { GithubModule } from './github/github.module'

// API Version
//const pj = readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')
//const { version } = JSON.parse(pj)
const version = '1.0.0'

// Dotenv fetch
config()

// Root Controller
@ApiTags('Version')
@Controller()
class RootController {
  @Get()
  @ApiOperation({ summary: 'API Version', description: 'Returns current API Version' })
  @ApiResponse({ status: 200, description: 'Return the version number inside status object' })
  getVersion(@Res() res: any) {
    res.status(200).send(
      baseResponse(200, `Venturus Backend Test - version: ${version}`)
    )
  }
}

// Module
@Module({
  imports: [
    // Database connection
    MongooseModule.forRoot(databaseURI, {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_DATABASE
    }),
    // Modules
    GithubModule
  ],
  controllers: [ RootController ]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    console.log('App module is running')
  }
}
