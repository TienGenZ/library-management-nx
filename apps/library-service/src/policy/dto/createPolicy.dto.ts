import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePolicyDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  minAge: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maxAge: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cardReaderDuration: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  bookDate: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maxBooks: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maxDate: number;
}
