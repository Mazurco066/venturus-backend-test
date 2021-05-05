// Dependencies
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IGithubRepository} from '../../repository'
import { GetRepoMetricsQuery } from '../impl'
import { baseResponse, extractAverage, extractDeviation } from 'src/helpers'

// Query
@QueryHandler(GetRepoMetricsQuery)
export class GetRepoMetricsHandler implements IQueryHandler<GetRepoMetricsQuery> {
  
  /**
   * Class constructor
   * @param repository - Github repositoiry used to query info
   */
  constructor(
    @Inject('GithubRepo')
    private readonly repository: IGithubRepository
  ) {}
  
  /**
   * Query run method
   * @param query - Check GetRepoMetricsQuery for details
   */
  async execute(query: GetRepoMetricsQuery) {
    const { params } = query

    // Step 01 - search repos
    const r = await this.repository.searchRepositories(params)
    if (r.status.code !== 200)
      return baseResponse(r.status.code, 'Project(s) not found', [])
    if (!r.data.length)
      return baseResponse(404, 'Project(s) not found', [])
    
    // Step 02 - save metrics

    // Step 03 - retrieve all issues
    const r2 = await this.repository.searchOpenedIssues(r.data[0].full_name, [])

    // Step 04 - AVG and Deviation
    return baseResponse(
      r2.status.code,
      'Consolidated data',
      {
        projectName: r.data[0].full_name,
        numberOfIssues: r2.data.length,
        average: extractAverage(r2.data),
        deviation: extractDeviation(r2.data, extractAverage(r2.data))
      }
    )
  }
}