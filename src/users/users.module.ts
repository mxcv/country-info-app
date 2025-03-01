import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HolidaysModule } from 'src/holidays/holidays.module';

@Module({
  imports: [HolidaysModule],
  controllers: [UsersController],
})
export class UsersModule {}
