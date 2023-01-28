import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsLowercase, IsOptional } from 'class-validator';

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
}

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}
