import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
