// Dependencies
import { Controller, Get, Query, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetRepoMetricsDTO } from '../dtos'
import { GithubService } from '../services'

@ApiTags('Github')
@Controller('github')
export class GithubController {
  
  /**
   * Class constructor
   * @param service - Github service used to call methods
   */
  constructor(
    private readonly service: GithubService
  ) {}

  /**
   * Get repo metrics endpoint
   * @param params - Check GetRepoMetricsDTO for details
   */
  @Get('/repoMetrics')
  @ApiOperation({
    summary: 'Get Repository Metrics',
    description: 'Get repository matrics based on search and consolidates to use into a dashboard.'
  })
  @ApiResponse({
    status: 200,
    description: 'Return the consolidade data as Array'
  })
  async getRepoMetrics(
    @Res() res: any,
    @Query() params: GetRepoMetricsDTO
  ) {
    const r = await this.service.getRepoMetrics(params)
    return res.status(r.status.code).send(r)
  }
}
