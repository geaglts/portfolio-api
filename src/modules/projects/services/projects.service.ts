import { Injectable } from '@nestjs/common';

import { CrateProjectDto } from '../dtos/Proyects.dto';

@Injectable()
export class ProjectsService {
  getAll() {
    return [];
  }

  create(data: CrateProjectDto) {
    return data;
  }
}
