// Dependencies
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IGithubRepository} from '../../repository'
import { GetRepoMetricsQuery } from '../impl'
import { baseResponse, extractAverage, extractDeviation, pipeResponse, basePipe } from '../../../../helpers'

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
    const { params, ipAddress } = query

    // Step 01 - search repo
    const searchRepo = async (params: any) => {
      const { initialParams } = params
      const r = await this.repository.searchRepositories(initialParams)
      if (r.status.code !== 200) {
        return pipeResponse(404, 'Repository not found.')
      }
      return pipeResponse(200, 'Repository Found.', { ...params }, {
        foundRepo: r.data[0]
      })
    }
    
    // Step 02 - store metrics
    const storeMetrics = async (params: any) => {
      const { initialParams: { repo, username }, ipAddress, foundRepo: { full_name } } = params
      const r = await this.repository.storeSearchHistory(ipAddress, repo, username, full_name)
      if (r.status.code !== 200)
        return pipeResponse(r.status.code, r.status.message)
      return pipeResponse(200, 'Search history updated.', { ...params }, {
        storedSearch: r.data
      })
    }

    // Step 03 - retrieve issues
    const retrieveIssues = async (params: any) => {
      const { foundRepo: { full_name } } = params
      const r = await this.repository.searchOpenedIssues(full_name, [])
      if (r.status.code !== 200) {
        return pipeResponse(404, 'Issues not found.')
      }
      return pipeResponse(200, 'Issues Found.', { ...params }, {
        foundIssues: r.data
      })
    }

    // Step 04 - calc avg and deviation
    const calcMetrics = async (params: any) => {
      const { foundRepo: { full_name }, foundIssues } = params
      const stats = {
        projectName: full_name,
        numberOfIssues: foundIssues.length,
        average: extractAverage(foundIssues),
        deviation: extractDeviation(foundIssues, extractAverage(foundIssues))
      }
      return pipeResponse(200, 'Consolidated data retrieved.', { ...params }, { stats })
    }

    // Query pipeline
    const pipeline = basePipe(
      searchRepo,
      storeMetrics,
      retrieveIssues,
      calcMetrics
    )

    // Query pipeline run
    const queryResponse = await pipeline({ initialParams: params, ipAddress })

    // Query return
    return baseResponse(
      queryResponse.status.code,
      queryResponse.status.message,
      queryResponse.stats
    )
  }
}