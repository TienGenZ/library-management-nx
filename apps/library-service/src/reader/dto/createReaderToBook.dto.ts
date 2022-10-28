import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  expiredAt: string;
}
