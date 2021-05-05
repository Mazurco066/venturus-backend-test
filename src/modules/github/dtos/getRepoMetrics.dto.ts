// Dependencies
import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

// DTO
export class GetRepoMetricsDTO {
  @IsString({ message: 'repo must be text' })
  @IsNotEmpty({ message: 'repo must not be empty' })
  @ApiProperty({ type: String, required: true, example: 'React' })
  readonly repo: string

  @IsString({ message: 'username must be text' })
  @IsNotEmpty({ message: 'username must not be empty' })
  @ApiProperty({ type: String, required: true, example: 'mazurco066' })
  readonly username: string
}