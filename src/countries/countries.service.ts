import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CountryResponse } from './dto/country-response.dto';
import { AxiosError } from 'axios';
import { PopulationCount } from './dto/population-count.dto';
import { CountryInfoResponse } from './dto/country-info-response';

@Injectable()
export class CountriesService {
  private readonly NAGERDATE_API_URL = this.configService.get(
    'NAGERDATE_API_URL',
  ) as string;
  private readonly COUNTRIESNOW_API_URL = this.configService.get(
    'COUNTRIESNOW_API_URL',
  ) as string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getCountries(): Promise<CountryResponse[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.NAGERDATE_API_URL}/AvailableCountries`),
    );
    return response.data as CountryResponse[];
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfoResponse> {
    const result = await Promise.all([
      this.getBorderCountries(countryCode),
      this.getPopulationData(countryCode),
      this.getFlag(countryCode),
    ]);
    return {
      borderCountries: result[0],
      populationData: result[1],
      flagUrl: result[2],
    };
  }

  private async getBorderCountries(
    countryCode: string,
  ): Promise<CountryResponse[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.NAGERDATE_API_URL}/CountryInfo/${countryCode}`,
        ),
      );
      const responseData = response.data as {
        borders: { commonName: string; countryCode: string }[];
      };
      return responseData.borders.map((x) => ({
        name: x.commonName,
        countryCode: x.countryCode,
      }));
    } catch (e) {
      if ((e as AxiosError).status === 404) {
        throw new NotFoundException(
          'The country is not found in border countries',
        );
      }
      throw e;
    }
  }

  private async getPopulationData(
    countryCodeIso2: string,
  ): Promise<PopulationCount[]> {
    const countryCodeIso3 = await this.convertIso2ToIso3(countryCodeIso2);
    const response = await firstValueFrom(
      this.httpService.get(`${this.COUNTRIESNOW_API_URL}/countries/population`),
    );
    const responseData = response.data as {
      data: { iso3: string; populationCounts: PopulationCount[] }[];
    };
    const populationData = responseData.data.find(
      (x) => x.iso3 === countryCodeIso3,
    )?.populationCounts;
    if (!populationData) {
      throw new NotFoundException(
        'The country is not found in population data',
      );
    }
    return populationData;
  }

  async getFlag(countryCode: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.COUNTRIESNOW_API_URL}/countries/flag/images`,
      ),
    );
    const responseData = response.data as {
      data: { iso2: string; flag: string }[];
    };
    const flag = responseData.data.find((x) => x.iso2 === countryCode)?.flag;
    if (!flag) {
      throw new NotFoundException('The country is not found in flags');
    }
    return flag;
  }

  private async convertIso2ToIso3(countryCodeIso2: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.COUNTRIESNOW_API_URL}/countries/iso`),
    );
    const responseData = response.data as {
      data: { Iso2: string; Iso3: string }[];
    };
    const countryCodeIso3 = responseData.data.find(
      (x) => x.Iso2 === countryCodeIso2,
    )?.Iso3;
    if (!countryCodeIso3) {
      throw new NotFoundException('The country is not found in ISO codes');
    }
    return countryCodeIso3;
  }
}
