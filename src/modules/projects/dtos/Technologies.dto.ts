import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsLowercase,
  IsOptional,
  IsArray,
  IsMongoId,
  IsHexColor,
} from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  extension: string;

  @IsOptional()
  @IsString()
  documentationUrl: string;

  @IsOptional()
  @IsUrl()
  iconUrl: string;

  @IsOptional()
  @IsHexColor()
  color: string;
}

export class DeleteManyTechnologiesDto {
  @IsArray()
  @IsMongoId({ each: true })
  technologyIds: string[];
}

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}
