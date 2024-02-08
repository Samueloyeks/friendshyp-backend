import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { Parcel } from './entities/parcel.entity';
import { Country } from '../country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel, Country])],
  controllers: [ParcelController],
  providers: [ParcelService],
})
export class ParcelModule {}
