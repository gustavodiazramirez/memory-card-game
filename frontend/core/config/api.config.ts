export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  ENDPOINTS: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    REFRESH_TOKEN: '/sessions/refresh',
  },
} as const;
