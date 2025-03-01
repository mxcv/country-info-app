import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class HolidayCreate {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  holidays?: string[];
}
