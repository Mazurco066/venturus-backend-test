// Dependencies
import { IsNotEmpty, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

// DTO
export class GetRepoMetricsAlongTimeDTO {
  @IsArray({ message: 'identifiers must be an Array' })
  @IsNotEmpty({ message: 'identifiers must not be empty' })
  @ApiProperty({ type: Array, required: true, example: ['facebook/react'] })
  readonly identifiers: string[]
}