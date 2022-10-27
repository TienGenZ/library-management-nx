import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateReaderToBookDto {
  @ApiProperty()
  @IsBoolean()
  returned: boolean;
}
