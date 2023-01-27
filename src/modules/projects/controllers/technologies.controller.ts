import { Controller, Get } from '@nestjs/common';

import { TechnologiesService } from '../services/technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private technologyService: TechnologiesService) {}

  @Get()
  getAll() {
    return this.technologyService.getAll();
  }
}
