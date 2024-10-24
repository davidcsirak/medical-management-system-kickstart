import { ILocationSearchResult } from '../../location/interfaces/location-autocomplete-result.interface';

export interface IPatient {
  id: string;
  serviceProvider: ILocationSearchResult;
  name: string;
  socialSecurityNumber: string;
}
