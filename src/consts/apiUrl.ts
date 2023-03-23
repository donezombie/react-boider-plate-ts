import { isDevelopment } from 'consts';

const ROOT_URL = `${
  isDevelopment ? 'https://betterhome-mvp.twenty-tech.com' : window.location.origin
}/api`;

// Dont remove this command
// ImportAPIURL
export const APP_MANAGEMENT_URL = `${ROOT_URL}/app-management`;
export const APP_INTEGRATION_URL = `${ROOT_URL}/app-integration`;
export const USER_URL = `${ROOT_URL}/user`;
