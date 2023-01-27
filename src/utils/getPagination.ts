import { PaginationDto } from '../modules/dtos/Pagination.dto';

type PaginationStructure = { limit: number; offset: number; page: number };

export function getPagination({ limit = 10, page }: PaginationDto): PaginationStructure {
  if (!page || page < 1) return { limit, offset: 0, page: 1 };
  return { limit, offset: (page - 1) * limit, page };
}
