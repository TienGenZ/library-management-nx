import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class UpdateBookDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  bookTypeId?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  publisherId?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  publishedAt?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  receivingDate: Date;
}

export class UpdateBookTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePublisherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
