// Nest Libs
import { Injectable } from '@nestjs/common'

// Helpers
import { IBaseResponse, baseResponse } from 'src/helpers'

// Interface
export interface IGithubRepository {
  getStats(): Promise<IBaseResponse>
}

// Repository
@Injectable()
export class GithubRepository implements IGithubRepository {
  constructor() {}

  async getStats() {
    return baseResponse(200, '')
  }
}