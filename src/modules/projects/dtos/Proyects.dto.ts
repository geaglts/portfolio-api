import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsLowercase,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  github: string;

  @IsString()
  @IsLowercase()
  deployUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  description: string;

  @IsBoolean()
  top: boolean;
}

export class DeleteManyProjectDto {
  @IsArray()
  @IsMongoId({ each: true })
  projectIds: string[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
