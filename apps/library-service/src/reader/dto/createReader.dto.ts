import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ReaderType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export class CreateReaderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()

  dob: string;

  @ApiProperty()
  @IsEnum(ReaderType)
  type: ReaderType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expiredAt: string;
}
