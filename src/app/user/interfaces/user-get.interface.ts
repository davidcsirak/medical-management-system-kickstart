import { ILocation } from '../../location/interfaces/location.interface';
import { IUser } from './user.interface';

export interface IUserGet extends IUser {
  serviceProviders: ILocation[];
}
