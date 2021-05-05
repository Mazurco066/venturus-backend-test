// Nest Libs
import { IQuery } from '@nestjs/cqrs'

// Dtos
import { GetRepoMetricsDTO } from '../../dtos'

// Query
export class GetRepoMetricsQuery implements IQuery {
  constructor(
    public readonly params: GetRepoMetricsDTO,
    public readonly ipAddress: string
  ) {}
}