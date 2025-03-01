import { Body, Controller, Param, Post } from '@nestjs/common';
import { HolidaysService } from '../holidays/holidays.service';
import { ApiTags } from '@nestjs/swagger';
import { HolidayCreate } from '../holidays/holiday-create.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Post(':userId/calendar/holidays')
  async post(@Param('userId') userId: number, @Body() holiday: HolidayCreate) {
    await this.holidaysService.addHoliday(userId, holiday);
  }
}
