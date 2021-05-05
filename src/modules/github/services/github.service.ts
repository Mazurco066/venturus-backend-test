// Nest Libs
import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetRepoMetricsDTO, GetRepoMetricsAlongTimeDTO } from '../dtos'
import { GetRepoMetricsQuery, GetRepoMetricsAlongTimeQuery } from '../queries/impl'

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

  /**
   * Get Repo metrics along time service
   * @param params - Check GetRepoMetricsDTO for details
   */
   async getRepoMetricsAlongTime(params: GetRepoMetricsAlongTimeDTO) {
    return await this.queryBus.execute(new GetRepoMetricsAlongTimeQuery(params))
  }
}
