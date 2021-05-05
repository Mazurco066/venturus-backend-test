// Dependencies
import { Controller, Get, Query, Res, Req, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetRepoMetricsDTO, GetRepoMetricsAlongTimeDTO } from '../dtos'
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
    @Req() req: any,
    @Query() params: GetRepoMetricsDTO
  ) {
    const clientIpAddress = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
    const r = await this.service.getRepoMetrics(params, clientIpAddress)
    return res.status(r.status.code).send(r)
  }

  /**
   * Get repo metrics along time endpoint
   * @param params - Check GetRepoMetricsAlongTimeDTO for details
   */
   @Post('/repoMetricsAlongTime')
   @ApiOperation({
     summary: 'Get Repository Metrics Along Time',
     description: 'Get repository matrics based on search and consolidates to use into a dashboard.'
   })
   @ApiResponse({
     status: 200,
     description: 'Return the consolidade data as Array'
   })
   async getRepoMetricsAlongTime(
     @Res() res: any,
     @Body() params: GetRepoMetricsAlongTimeDTO
   ) {
     const r = await this.service.getRepoMetricsAlongTime(params)
     return res.status(r.status.code).send(r)
   }
}
