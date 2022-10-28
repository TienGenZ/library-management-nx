import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ReaderType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export class CreateReaderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
