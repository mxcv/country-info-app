import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('DATABASE_URL'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
        entities: [path.join(__dirname, '**/*.entity.js')],
      }),
    }),
  ],
})
export class AppModule {}
