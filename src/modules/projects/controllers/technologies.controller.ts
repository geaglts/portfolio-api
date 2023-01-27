import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { TechnologiesService } from '../services/technologies.service';

import { PaginationDto } from '../../dtos/Pagination.dto';
import { CreateTechnologyDto } from '../dtos/Technologies.dto';

@Controller('technologies')
export class TechnologiesController {
  constructor(private technologyService: TechnologiesService) {}

  @Get()
  getAll(@Query() queries: PaginationDto) {
    return this.technologyService.getAll(queries);
  }

  @Post()
  createOne(@Body() body: CreateTechnologyDto) {
    return this.technologyService.createOne(body);
  }
}
