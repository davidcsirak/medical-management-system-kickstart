import { SexEnum } from '../enums/sex.enum';
import { IPatient } from './patient.interface';

export interface IPatientGet extends IPatient {
  sex: SexEnum;
  placeOfBirth: string;
  dateOfBirth: string;
  birthName: string;
  motherBirthName: string;
}
