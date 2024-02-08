import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Parcel {
  @PrimaryColumn()
  id: string;
  @Column({ unique: true })
  SKU: string;
  @Column({ type: 'varchar', length: 100 })
  description: string;
  @ManyToOne(() => Country, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;
  @Column({ type: 'varchar', length: 30 })
  town: string;
  @Column({ type: 'varchar', length: 30 })
  street: string;
  @Type(() => Date)
  @Column('text')
  deliveryDate: Date;
}
