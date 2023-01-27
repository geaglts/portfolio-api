import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiKeyGuard } from 'src/modules/auth/guards/api-key.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';

import { ProjectsService } from '../services/projects.service';

import {
  CreateProjectDto,
  DeleteManyProjectDto,
  UpdateProjectDto,
} from '../dtos/Proyects.dto';

@UseGuards(ApiKeyGuard)
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Public()
  @Get('/all')
  getAll() {
    return this.projectService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.projectService.getOne(id);
  }

  @Post()
  createOne(@Body() body: CreateProjectDto) {
    return this.projectService.createOne(body);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateOne(id, body);
  }

  @Delete('/many')
  deleteMany(@Body() body: DeleteManyProjectDto) {
    return this.projectService.deleteManys(body.projectIds);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.projectService.deleteOne(id);
  }
}
