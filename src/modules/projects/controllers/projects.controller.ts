import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

import { ProjectsService } from '../services/projects.service';

import { MongoIdPipe } from '../../../common/mongo-id.pipe';

import { PaginationDto } from '../../dtos/Pagination.dto';
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
  getAll(@Query() queries: PaginationDto) {
    return this.projectService.getAll(queries);
  }

  @Public()
  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.projectService.getOne(id);
  }

  @Post()
  createOne(@Body() body: CreateProjectDto) {
    return this.projectService.createOne(body);
  }

  @Put('/:id')
  updateOne(@Param('id', MongoIdPipe) id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateOne(id, body);
  }

  @Delete('/many')
  deleteMany(@Body() body: DeleteManyProjectDto) {
    return this.projectService.deleteMany(body.projectIds);
  }

  @Delete('/:id')
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.projectService.deleteOne(id);
  }
}
