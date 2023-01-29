import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

import { TechnologiesService } from '../services/technologies.service';

import { PaginationDto } from '../../dtos/Pagination.dto';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
  DeleteManyTechnologiesDto,
} from '../dtos/Technologies.dto';

import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@UseGuards(ApiKeyGuard)
@Controller('technologies')
@ApiTags('Technologies')
export class TechnologiesController {
  constructor(private technologyService: TechnologiesService) {}

  @Public()
  @Get('/all')
  getAll(@Query() queries: PaginationDto) {
    return this.technologyService.getAll(queries);
  }

  @Public()
  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.technologyService.getOne(id);
  }

  @Post()
  createOne(@Body() body: CreateTechnologyDto) {
    return this.technologyService.createOne(body);
  }

  @Put('/:id')
  updateOne(@Param('id', MongoIdPipe) id: string, @Body() body: UpdateTechnologyDto) {
    return this.technologyService.updateOne(id, body);
  }

  @Delete('/many')
  deleteManu(@Body() body: DeleteManyTechnologiesDto) {
    return this.technologyService.deleteMany(body.technologyIds);
  }

  @Delete('/:id')
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.technologyService.deleteOne(id);
  }
}
