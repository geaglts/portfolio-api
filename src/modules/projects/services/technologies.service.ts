import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TechnologyEntity } from '../entities/Technology.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectModel(TechnologyEntity.name)
    private technologyService: Model<TechnologyEntity>,
  ) {}

  async getAll() {
    const technologies = await this.technologyService.find();
    return technologies;
  }
}
