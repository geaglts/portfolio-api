import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProjectEntity } from '../entities/Project.entity';

import { PaginationDto } from 'src/modules/dtos/Pagination.dto';
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateTechnologies,
} from '../dtos/Proyects.dto';

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
      .populate([
        { path: 'technologies', select: '_id name extension documentationUrl iconUrl' },
      ])
      .sort({ title: 1 });
    return { pagination, projects };
  }

  async getOne(id: string) {
    const project = await this.projectModel
      .findById(id)
      .populate([
        { path: 'technologies', select: '_id name extension documentationUrl iconUrl' },
      ]);
    if (!project) {
      throw new NotFoundException('Este proyecto no fue encontrado');
    }
    return project;
  }

  async createOne(data: CreateProjectDto) {
    const project = new this.projectModel(data);
    return project.save();
  }

  async updateOne(_id: string, data: UpdateProjectDto) {
    try {
      const updatedProject = await this.projectModel.updateOne({ _id }, data);
      const { modifiedCount } = updatedProject;
      if (modifiedCount === 0) throw new Error();
      return { message: 'Actualizado correctamente' };
    } catch {
      throw new BadRequestException('Este proyecto no fue encontrado');
    }
  }

  async updateTechnologies(projectId: string, data: UpdateTechnologies) {
    try {
      const project = await this.projectModel.findById(projectId);
      if (!project) throw new NotFoundException('Este proyecto no fue encontrado');
      await this.projectModel.updateOne(
        { _id: project._id },
        { $set: { technologies: data.technologies } },
      );
      return { message: 'Las tecnologías se actualizaron correctamente' };
    } catch (error) {
      throw new BadRequestException('Verifica tu información');
    }
  }

  async deleteOne(projectId: string) {
    try {
      await this.projectModel.findByIdAndDelete(projectId);
      return { message: 'Eliminado correctamente', deleted: projectId };
    } catch (error) {
      console.log(error);
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
