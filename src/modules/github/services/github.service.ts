// Nest Libs
import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetRepoMetricsDTO } from '../dtos'
import { GetRepoMetricsQuery } from '../queries/impl'

@Injectable()
export class GithubService {

  /**
   * Class constructor
   * @param queryBus - Query bus for running queries
   */
  constructor(
    private readonly queryBus: QueryBus
  ) {}
  
  /**
   * Get Repo metrics service
   * @param params - Check GetRepoMetricsDTO for details
   */
   async getRepoMetrics(params: GetRepoMetricsDTO, ipAddress: string) {
    return await this.queryBus.execute(new GetRepoMetricsQuery(params, ipAddress))
  }
}
