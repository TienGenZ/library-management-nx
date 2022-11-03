import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ReaderType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export class CreateReaderDto {
  @ApiProperty({ example: 'Mai Thị Hằng Thư' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MaiThu@library.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'TP.Hồ Chí Minh' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'STUDENT' })
  @IsEnum(ReaderType)
  type: ReaderType;
}
