import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { humanId } from 'human-id';
import { Parcel } from './entities/parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { Country } from '../country/entities/country.entity';
import { ParcelQueryParams, ParcelResponseObject } from './types';

const PARCEL_ID_OPTIONS = {
  capitalize: false,
};
const PRIORITY_COUNTRY = 'Estonia';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    const parcel = new Parcel();
    parcel.id = humanId(PARCEL_ID_OPTIONS);
    parcel.SKU = createParcelDto.SKU;
    parcel.description = createParcelDto.description || '';
    parcel.country = createParcelDto.country;
    parcel.town = createParcelDto.town;
    parcel.street = createParcelDto.street;
    parcel.deliveryDate = createParcelDto.deliveryDate;

    return this.parcelRepository.save(parcel);
  }

  async findAll(
    @Query() query: ParcelQueryParams,
  ): Promise<ParcelResponseObject> {
    const { country, description, page = 1, size = 10 } = query;
    const offset = (Number(page) - 1) * size;

    const options = {
      relations: ['country'],
      order: { deliveryDate: 'ASC' },
      take: size,
      skip: offset,
      where: {},
    } as FindManyOptions;

    if (description) {
      options.where['description'] = ILike(`%${description}%`);
    }
    if (country) {
      options.where['country'] = {};
      options.where['country']['id'] = country;
    }

    const [parcels, total] = await this.parcelRepository.findAndCount(options);
    parcels.sort((a) => (a.country.name === PRIORITY_COUNTRY ? -1 : 1));

    return { data: parcels, total };
  }

  findBySKU(@Query('SKU') SKU: string): Promise<Parcel> {
    return this.parcelRepository.findOneBy({
      SKU,
    });
  }
}
