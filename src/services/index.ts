import { API_URL, headers, METHODS } from '../utils/consts';

export const getCultivations = async () => {
  try {
    const cultivationResponse = await fetch(`${API_URL}/cultivations`);
    const parsedRes = await cultivationResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

export const getCultivationUsers = async (id: string) => {
  try {
    const cultivationUsers = await fetch(`${API_URL}/cultivations/${id}/users`);
    const parsedRes = await cultivationUsers.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
