import { IsString, IsNotEmpty, IsLowercase } from 'class-validator';

export class CrateProjectDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  github: string;

  @IsString()
  @IsLowercase()
  deployUrl: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  description: string;
}
