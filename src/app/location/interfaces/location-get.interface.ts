import { IUser } from '../../user/interfaces/user.interface';
import { IAddress } from './address.interface';
import { ILocation } from './location.interface';

export interface ILocationGet extends ILocation {
  phoneNumber: string;
  users: IUser[];
  address: IAddress;
}
