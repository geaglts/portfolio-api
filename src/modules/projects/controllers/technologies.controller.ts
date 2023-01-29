import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';

import { TechnologiesService } from '../services/technologies.service';

import { PaginationDto } from '../../dtos/Pagination.dto';
import { CreateTechnologyDto, UpdateTechnologyDto } from '../dtos/Technologies.dto';

import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('technologies')
export class TechnologiesController {
  constructor(private technologyService: TechnologiesService) {}

  @Get('/all')
  getAll(@Query() queries: PaginationDto) {
    return this.technologyService.getAll(queries);
  }

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

  @Delete('/:id')
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.technologyService.removeOne(id);
  }
}
