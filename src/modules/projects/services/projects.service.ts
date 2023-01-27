import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProjectEntity } from '../entities/project.entity';

import { CreateProjectDto, UpdateProjectDto } from '../dtos/Proyects.dto';

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

  async getOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Este proyecto no fue encontrado');
    }
    return project;
  }

  async updateOne(_id: string, data: UpdateProjectDto) {
    try {
      const updatedProject = await this.projectModel.updateOne({ _id }, data);
      const { modifiedCount } = updatedProject;
      if (modifiedCount === 0) throw new Error();
      return { body: 'Actualizado correctamente' };
    } catch {
      throw new BadRequestException('Por favor verifica tus datos');
    }
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
