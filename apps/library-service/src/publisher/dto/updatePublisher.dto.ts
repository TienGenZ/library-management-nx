import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublisherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
