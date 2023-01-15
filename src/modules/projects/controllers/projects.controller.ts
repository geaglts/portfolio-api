import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from 'src/modules/auth/guards/api-key.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';

import { ProjectsService } from '../services/projects.service';

import { CrateProjectDto } from '../dtos/Proyects.dto';

@Controller('projects')
@UseGuards(ApiKeyGuard)
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Public()
  @Get('/all')
  getAll() {
    return this.projectService.getAll();
  }

  @Post()
  create(@Body() body: CrateProjectDto) {
    return this.projectService.create(body);
  }
}
