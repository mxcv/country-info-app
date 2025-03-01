import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryResponse } from './dto/country-response.dto';
import { CountryInfoRequest } from './dto/country-info-request';
import { CountryInfoResponse } from './dto/country-info-response';

@Controller('countries')
@ApiTags('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  @ApiOkResponse({ type: CountryResponse, isArray: true })
  async get(): Promise<CountryResponse[]> {
    return await this.countriesService.getCountries();
  }

  @Get(':countryCode')
  @ApiOkResponse({ type: CountryInfoResponse })
  async getCountryInfo(
    @Param() request: CountryInfoRequest,
  ): Promise<CountryInfoResponse> {
    return await this.countriesService.getCountryInfo(request.countryCode);
  }
}
