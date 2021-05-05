// Nest Libs
import { IQuery } from '@nestjs/cqrs'

// Dtos
import { GetRepoMetricsAlongTimeDTO } from '../../dtos'

// Query
export class GetRepoMetricsAlongTimeQuery implements IQuery {
  constructor(
    public readonly params: GetRepoMetricsAlongTimeDTO
  ) {}
}