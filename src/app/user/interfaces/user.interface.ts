import { ILocation } from '../../location/interfaces/location.interface';
import { RoleEnum } from '../../shared/enums/role.enum';

export interface IUser {
  id: string;
  username: string;
  role: RoleEnum;
  serviceProviders: ILocation[];
}
