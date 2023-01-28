import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TechnologyEntity } from '../entities/Technology.entity';

import { getPagination } from '../../../utils/getPagination';

import { PaginationDto } from '../../dtos/Pagination.dto';
import { CreateTechnologyDto } from '../dtos/Technologies.dto';

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

  async createOne(data: CreateTechnologyDto) {
    const newTechnologie = new this.technologyService(data);
    return newTechnologie.save();
  }
}
