import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsLowercase } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsLowercase()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  extension: string;

  @IsString()
  documentationUrl: string;

  @IsUrl()
  iconUrl: string;
}

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}
