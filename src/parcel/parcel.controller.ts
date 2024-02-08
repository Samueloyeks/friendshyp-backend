import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { Parcel } from './entities/parcel.entity';
import { ParcelQueryParams } from './types';

@Controller('parcel')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  async create(@Body() createParcelDto: CreateParcelDto): Promise<Parcel> {
    return await this.parcelService.create(createParcelDto);
  }

  @Get()
  findAll(@Query() query: ParcelQueryParams) {
    return this.parcelService.findAll(query);
  }

  @Get('find-by-sku')
  async findBySKU(@Query('SKU') SKU = ''): Promise<Parcel> {
    const existingParcel = await this.parcelService.findBySKU(SKU);

    if (!existingParcel) {
      throw new BadRequestException('Parcel Not Found');
    }

    return existingParcel;
  }
}
