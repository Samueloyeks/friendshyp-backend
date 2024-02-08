import { Parcel } from './entities/parcel.entity';

export type ParcelQueryParams = {
  page: number;
  size: number;
  country?: string;
  description?: string;
};

export type ParcelResponseObject = {
  data: Parcel[];
  total: number;
};
