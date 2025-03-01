import { ApiProperty } from '@nestjs/swagger';

export class PopulationCount {
  @ApiProperty()
  year: number;

  @ApiProperty()
  value: number;
}
