import { SexEnum } from '../enums/sex.enum';

export interface ICreatePatientRequest {
  name: string;
  socialSecurityNumber: string;
  sex: SexEnum;
  placeOfBirth: string;
  dateOfBirth: string;
  birthName: string;
  motherBirthName: string;
  serviceProviderId: string;
}
