import { ApiProperty } from '@nestjs/swagger';

export class CountryResponse {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  name: string;
}
