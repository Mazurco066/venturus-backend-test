// Nest Libs
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common'

// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

// Services

@ApiTags('Users')
@Controller('user')
export class GithubController {
  constructor() {}

}
