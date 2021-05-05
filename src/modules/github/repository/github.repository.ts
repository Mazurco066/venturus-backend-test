// Dependencies
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IBaseResponse, baseResponse, httpClient } from '../../../helpers'
import { Model } from 'mongoose'
import { GetRepoMetricsDTO } from '../dtos'
import { SearchTrack, SearchTrackDocument } from '../schema'
import { getMiddleIssuePages, getLastPageFromURL } from '../../../utils'

// Interface
export interface IGithubRepository {
  searchRepositories(params: GetRepoMetricsDTO): Promise<IBaseResponse>
  searchOpenedIssues(repo: string, queryParameters: IQueryParameters[]) : Promise<IBaseResponse>
  storeSearchHistory(ipAddress: string, repo: string, username: string, result: string): Promise<IBaseResponse>
}

export interface IQueryParameters {
  name: string
  value: string | number
}

// Repository
@Injectable()
export class GithubRepository implements IGithubRepository {
  
  /**
   * Class constructor
   * @param schema - Database communication
   */
  constructor(
    @InjectModel(SearchTrack.name) private schema: Model<SearchTrackDocument>
  ) {}

  /**
   * Search github repo by name
   * @param params - Filter params
   * @returns list of found repositories
   */
  async searchRepositories(params: GetRepoMetricsDTO) {
    try {

      const { repo } = params

      const r = await httpClient.get(`/search/repositories?q=${repo}&order=desc&per_page=50`)

      return baseResponse(
        200,
        `Github repositories that matches with '${repo}' found.`,
        r.data?.items || []
      )

    } catch(_) {
      return baseResponse(500, 'Error while searching github')
    } 
  }

  /**
   * Store search data into mongodb
   * @param ipAddress - ip from caller
   * @param repo - Search text
   * @returns - The created register
   */
  async storeSearchHistory(ipAddress: string, repo: string, username: string, result: string) {
    try {

      const r = await this.schema.create({
        ipAddress,
        searchString: repo,
        username,
        result
      })

      if (r) return baseResponse(200, 'Search History Updated', r)
      else return baseResponse(500, 'Could not store search history into mongodb')

    } catch (_) {
      return baseResponse(500, 'Error while storing data into mongodb')
    }
  }

  /**
   * Return all issues from a github repository
   * @param repo - repository name
   * @param queryParameters - Aditional query parameters to github API
   * @returns - returns the issues from the asked repository
   */
  async searchOpenedIssues(repo: string, queryParameters: IQueryParameters[]) {
    try {

      // Default query parameters
      const queryParams = [
        { name: 'per_page', value: 100 },
        { name: 'state', value: 'open' },
        ...queryParameters,
      ]

      // Get issues aux
      const getIssues = async(params: IQueryParameters[]) => {
        const queryParams = params.reduce((it: string, { name, value }: IQueryParameters) =>
          (it ? `${it}&${name}=${value}` : `${name}=${value}`), '')
        return await httpClient.get(`repos/${repo}/issues?${queryParams}`)
      }
      
      // Search issues on the first page, returns empty if there is no issues
      const { data: list, headers: { link } } = await getIssues([...queryParams, { name: 'page', value: 1 }]);
      if (!list.length) return baseResponse(404, 'No issues found', [])

      // Fetching data from remaining pages
      const promises = getMiddleIssuePages(getLastPageFromURL(link)).map((page: number) =>
        getIssues([...queryParams, { name: 'page', value: page }]))
      const allIssues = await Promise.all(promises)

      // Concat all results
      const issuesResults = list
        .concat(...allIssues.map((response) => response.data))
        .filter((issue: any) => !issue.pull_request)

      // Returning issues
      return baseResponse(200, 'Issues from project recovered', issuesResults)
      
    } catch(_) {
      return baseResponse(500, 'Error while searching github')
    } 
  }
}