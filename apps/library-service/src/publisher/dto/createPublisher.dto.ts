import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
