import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
