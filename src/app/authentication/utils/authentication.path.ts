import { environment } from '../../../environments/environment';

const AUTH_API_URL = environment.BASE_API_URL;
export const AUTHENTICATE_URL = `${AUTH_API_URL}/auth/authenticate`;
export const CURRENT_USER_URL = `${AUTH_API_URL}/me`;
export const REFRESH_URL = `${AUTH_API_URL}/auth/refresh`;
export const LOGOUT_URL = `${AUTH_API_URL}/auth/logout`;
