import { API_URL, headers, METHODS } from '../utils/consts';
import { addUserPayload } from '../types';

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

export const addCultivationUsers = async (cultivation_id: string, payload: addUserPayload) => {
  try {
    const requestOptions = {
      ...headers,
      method: METHODS.POST,
      body: JSON.stringify(payload),
    };
    const cultivationUsers = await fetch(`${API_URL}/cultivations/${cultivation_id}/users`, requestOptions);
    const parsedRes = await cultivationUsers.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

export const deleteUserFromCultivation = async (cultivation_id: string, userId: number) => {
  try {
    const cultivationUsers = await fetch(`${API_URL}/cultivations/${cultivation_id}/users/${userId}`, {
      method: METHODS.DELETE,
    });
    const response = cultivationUsers;
    if (response.status === 204) {
      return { message: 'User successfully deleted from cultivation' };
    }
    const parsedRes = await response.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

export const getUsers = async () => {
  try {
    const users = await fetch(`${API_URL}/users`);
    const parsedRes = await users.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

export const getCultivationRoles = async () => {
  try {
    const roles = await fetch(`${API_URL}/cultivation-roles`);
    const parsedRes = await roles.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
