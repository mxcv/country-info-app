import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CountryInfoRequest {
  @ApiProperty({ description: 'ISO 3166-1 alpha-2' })
  @IsString()
  @Transform((x) => (x.value as string).toUpperCase())
  countryCode: string;
}
