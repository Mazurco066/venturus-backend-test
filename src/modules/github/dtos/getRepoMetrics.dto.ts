import { IsString, IsNotEmpty } from 'class-validator'

export class GetRepoMetricsDTO {

  @IsString({ message: 'repo must be text' })
  @IsNotEmpty({ message: 'repo must not be empty' })
  readonly repo: string

}