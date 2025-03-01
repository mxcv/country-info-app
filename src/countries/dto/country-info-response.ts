import { ApiProperty } from '@nestjs/swagger';
import { CountryResponse } from './country-response.dto';
import { PopulationCount } from './population-count.dto';

export class CountryInfoResponse {
  @ApiProperty({ type: CountryResponse, isArray: true })
  borderCountries: CountryResponse[];

  @ApiProperty({ type: PopulationCount, isArray: true })
  populationData: PopulationCount[];

  @ApiProperty()
  flagUrl: string;
}
