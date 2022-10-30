import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReaderToBooksQuery {
  @ApiPropertyOptional()
  @IsInt()
  readerId?: number;

  @ApiPropertyOptional()
  @IsInt()
  bookId?: number;
}
