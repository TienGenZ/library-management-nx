import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReaderToBookQuery {
  @ApiPropertyOptional()
  @IsInt()
  readerId?: number;

  @ApiPropertyOptional()
  @IsInt()
  bookId?: number;
}
