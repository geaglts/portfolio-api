import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsController } from './controllers/projects.controller';
import { TechnologiesController } from './controllers/technologies.controller';

import { ProjectsService } from './services/projects.service';
import { TechnologiesService } from './services/technologies.service';

import { ProjectEntity, ProjectSchema } from './entities/Project.entity';
import { TechnologyEntity, TechnologySchema } from './entities/Technology.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectEntity.name, schema: ProjectSchema },
      { name: TechnologyEntity.name, schema: TechnologySchema },
    ]),
  ],
  controllers: [ProjectsController, TechnologiesController],
  providers: [ProjectsService, TechnologiesService],
})
export class ProjectsModule {}
