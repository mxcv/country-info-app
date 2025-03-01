import { Injectable } from '@nestjs/common';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Holiday } from './holiday.entity';
import { HolidayCreate } from './holiday-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HolidaysService {
  private readonly NAGERDATE_API_URL = this.configService.get(
    'NAGERDATE_API_URL',
  ) as string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Holiday)
    private readonly holidaysRepository: Repository<Holiday>,
  ) {}

  async addHoliday(userId: number, holidayCreate: HolidayCreate) {
    const result = await Promise.all([
      this.getHolidays(holidayCreate.countryCode, holidayCreate.year),
      this.holidaysRepository.findBy({
        date: And(
          MoreThanOrEqual(new Date(holidayCreate.year, 0, 1)),
          LessThanOrEqual(new Date(holidayCreate.year, 11, 31)),
        ),
        user: { id: userId },
      }),
    ]);
    const yearHolidays = result[0];
    const userHolidays = result[1].map((x) => x.name);
    const filteredHolidays = yearHolidays
      .filter(
        (x) =>
          (!holidayCreate.holidays ||
            holidayCreate.holidays.includes(x.name)) &&
          !userHolidays.includes(x.name),
      )
      .map((x) => ({
        name: x.name,
        date: new Date(x.date),
        user: { id: userId },
      }));
    await this.holidaysRepository.save(filteredHolidays);
  }

  private async getHolidays(countryCode: string, year: number) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.NAGERDATE_API_URL}/PublicHolidays/${year}/${countryCode}`,
      ),
    );
    return response.data as { date: string; name: string }[];
  }
}
