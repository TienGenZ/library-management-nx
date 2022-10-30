import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdatePolicyDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  minAge: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  maxAge: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  cardReaderDuration: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  bookDate: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  maxBooks: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  maxDate: number;
}
