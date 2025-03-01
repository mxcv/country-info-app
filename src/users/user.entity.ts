import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Holiday } from '../holidays/holiday.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => Holiday, (holiday) => holiday.user)
  holidays: Holiday[];
}
