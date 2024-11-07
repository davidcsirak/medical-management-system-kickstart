import { environment } from '../../../environments/environment';

const LOCATION_API_URL = `${environment.BASE_API_URL}/admin/service-provider`;
export const CREATE_LOCATION_URL = `${LOCATION_API_URL}`;
export const LOCATION_AUTOCOMPLETE_URL = `${LOCATION_API_URL}/search`;
export const LOCATION_URL = `${LOCATION_API_URL}`;
