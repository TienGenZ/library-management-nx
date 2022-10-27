import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt } from 'class-validator';

export class CreateReaderToBookDto {
  @ApiProperty()
  @IsInt()
  readerId: number;

  @ApiProperty()
  @IsInt()
  bookId: number;

  @ApiProperty()
  @IsBoolean()
  returned: boolean;

  @ApiProperty()
  @IsDate()
  expiredAt: Date;
}
