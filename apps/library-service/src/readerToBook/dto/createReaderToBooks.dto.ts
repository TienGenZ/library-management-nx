import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateReaderToBooksDto {
  @ApiProperty()
  @IsInt()
  readerId: number;

  @ApiProperty()
  @IsInt()
  bookId: number;
}
