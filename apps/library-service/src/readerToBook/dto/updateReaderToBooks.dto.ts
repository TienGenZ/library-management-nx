import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateReaderToBooksDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsBoolean()
  returned: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  @IsInt()
  readerId: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsInt()
  bookId: number;
}
