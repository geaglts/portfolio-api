import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';

import { ProjectEntity, ProjectSchema } from './entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectEntity.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
