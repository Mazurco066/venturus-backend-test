// Dependencies
import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IGithubRepository} from '../../repository'
import { GetRepoMetricsAlongTimeQuery } from '../impl'
import { baseResponse, pipeResponse, basePipe, extractTrackedIssues } from '../../../../helpers'

// Query
@QueryHandler(GetRepoMetricsAlongTimeQuery)
export class GetRepoMetricsAlongTimeHandler implements IQueryHandler<GetRepoMetricsAlongTimeQuery> {
  
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
   * @param query - Check GetRepoMetricsAlongTimeQuery for details
   */
  async execute(query: GetRepoMetricsAlongTimeQuery) {
    const { params } = query

    // Step 01 - get project issues
    const searchProjectsIssues = async (params: any) => {
      const { initialParams: { identifiers } } = params
      const issues = {}
      const promises = identifiers.map(async (identifier: string) => {
        const r = await this.repository.searchOpenedIssues(
          identifier,
          [{ name: 'direction', value: 'asc' }]
        )
        issues[identifier] = r.data
      })
      await Promise.all(promises)
      return pipeResponse(200, 'Issues Found.', { ...params }, { issues })
    }

    // Step 02 - Calculate projects issues by day
    const calcIssuesByDay = (params: any) => {
      const { issues } = params
      return pipeResponse(200, 'Issues by day', { ...params }, {
        trackedIssues: extractTrackedIssues(issues)
      })
    }
    
    // Query pipeline
    const pipeline = basePipe(
      searchProjectsIssues,
      calcIssuesByDay
    )

    // Query pipeline run
    const queryResponse = await pipeline({ initialParams: params })

    // Query return
    return baseResponse(
      queryResponse.status.code,
      queryResponse.status.message,
      queryResponse.trackedIssues
    )
  }
}