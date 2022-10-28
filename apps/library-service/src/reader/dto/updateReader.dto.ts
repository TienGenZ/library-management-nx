import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReaderType } from './createReader.dto';

export class UpdateReaderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  dob?: string;

  @ApiPropertyOptional()
  @IsEnum(ReaderType)
  type?: ReaderType;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  expiredAt?: string;
}
