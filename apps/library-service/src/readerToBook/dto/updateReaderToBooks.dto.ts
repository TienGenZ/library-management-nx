import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateReaderToBooksDto {
  @ApiProperty()
  @IsBoolean()
  returned: boolean;
}
