import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProjectEntity } from '../entities/project.entity';

import { CreateProjectDto } from '../dtos/Proyects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(ProjectEntity.name)
    private projectModel: Model<ProjectEntity>,
  ) {}

  async getAll() {
    const projects = await this.projectModel.find().exec();
    return projects;
  }

  async createOne(data: CreateProjectDto) {
    const project = new this.projectModel(data);
    return project.save();
  }

  async deleteOne(projectId: string) {
    try {
      const response = await this.projectModel.findByIdAndDelete(projectId);
      return { deleted: response.id };
    } catch (error) {
      throw new NotFoundException('Este proyecto no existe');
    }
  }

  async deleteManys(projectIds: string[]) {
    const response = await this.projectModel.deleteMany({
      id: { $in: projectIds },
    });
    return { deleted: response.deletedCount };
  }
}
