import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProjectEntity } from '../entities/Project.entity';

import { PaginationDto } from 'src/modules/dtos/Pagination.dto';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/Proyects.dto';

import { getPagination } from '../../../utils/getPagination';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(ProjectEntity.name)
    private projectModel: Model<ProjectEntity>,
  ) {}

  async getAll(params: PaginationDto) {
    const { limit, offset, page } = getPagination(params);
    const projectsCount = await this.projectModel.countDocuments();
    const pages = Math.ceil(projectsCount / limit);
    const pagination = { pages, page, limit };
    if (page > pages) return { pagination, projects: [] };
    const projects = await this.projectModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ title: 1 });
    return { pagination, projects };
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
      throw new BadRequestException('Este proyecto no fue encontrado');
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

  async deleteMany(projectIds: string[]) {
    const response = await this.projectModel.deleteMany({
      _id: { $in: projectIds },
    });
    return { deleted: response.deletedCount };
  }
}
