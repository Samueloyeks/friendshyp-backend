import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Country } from '../../country/entities/country.entity';

export class CreateParcelDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  SKU: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  country: Country;
  @IsString()
  @IsNotEmpty()
  town: string;
  @IsString()
  @IsNotEmpty()
  street: string;
  @IsDate()
  @IsNotEmpty()
  deliveryDate: Date;
}
