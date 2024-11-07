import { environment } from '../../../environments/environment';

const USER_API_URL = `${environment.BASE_API_URL}/admin/user`;
export const CREATE_USER_URL = `${USER_API_URL}/register`;
export const USER_URL = `${USER_API_URL}`;
