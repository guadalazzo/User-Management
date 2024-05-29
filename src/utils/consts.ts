export const API_URL = 'https://14dtv3lu9k.execute-api.eu-central-1.amazonaws.com';

export const headers = {
  headers: { 'Content-Type': 'application/json' },
};

export const METHODS = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
export const ROUTES = {
  BASE_URL: '/',
  CULTIVATION_EDIT: '/edit/:id',
};
export const ROLES = {
  HEAD_GROWER: 'Head grower',
  GROWER: 'Grower',
  GUEST: 'Guest',
  OBSERVER: 'Observer',
  WHOLESALER: 'Wholesaler',
};
