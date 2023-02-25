import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TechnologyEntity } from '../entities/Technology.entity';

import { getPagination } from '../../../utils/getPagination';

import { PaginationDto } from '../../dtos/Pagination.dto';
import { CreateTechnologyDto, UpdateTechnologyDto } from '../dtos/Technologies.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectModel(TechnologyEntity.name)
    private technologyService: Model<TechnologyEntity>,
  ) {}

  async getAll(params: PaginationDto) {
    const { limit, offset, page } = getPagination(params);
    const technologiesCount = await this.technologyService.countDocuments();
    const pages = Math.ceil(technologiesCount / limit);
    const pagination = { pages, page, limit };
    if (page > pages) return { pagination, technologies: [] };
    const technologies = await this.technologyService
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ name: 1 });
    return { pagination, technologies };
  }

  async getAllNames() {
    const technologies = await this.technologyService.find().select('_id name color');
    return technologies;
  }

  async getOne(id: string) {
    const technology = await this.technologyService.findById(id);
    if (!technology) throw new NotFoundException('No encontrado');
    return technology;
  }

  async createOne(data: CreateTechnologyDto) {
    try {
      const newTechnology = new this.technologyService(data);
      const savedTechnology = await newTechnology.save();
      return savedTechnology;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOne(id: string, data: UpdateTechnologyDto) {
    try {
      const updatedTechnology = await this.technologyService.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { message: 'Actualizado correctamente', body: updatedTechnology };
    } catch (error) {
      throw new BadRequestException('Verifica tu información');
    }
  }

  async deleteOne(id: string) {
    try {
      await this.technologyService.findByIdAndDelete(id);
      return { message: 'Eliminado correctamente', body: id };
    } catch (error) {
      throw new BadRequestException('Verifica tu información');
    }
  }

  async deleteMany(ids: string[]) {
    const response = await this.technologyService.deleteMany({ _id: { $in: ids } });
    return { message: 'Eliminados correctamente', body: response.deletedCount };
  }
}
