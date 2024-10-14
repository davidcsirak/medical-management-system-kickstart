import { RoleEnum } from '../../shared/enums/role.enum';

export interface ICreateUserRequest {
  username: string;
  password: string;
  role: RoleEnum;
}
