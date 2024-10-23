import { IAddress } from './address.interface';

export interface ICreateLocationRequest {
  shortName: string;
  longName: string;
  phoneNumber: string;
  address: IAddress;
}
