import { headers, METHODS } from '../utils/consts';
import { addUserPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 *  list all known cultivations
 */
export const getCultivations = async () => {
  try {
    const cultivationResponse = await fetch(`${API_URL}/cultivations`);
    const parsedRes = await cultivationResponse.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

/**
 * get a list of users with roles for the cultivation.
 * @param id string
 * @returns Promise
 */
export const getCultivationUsers = async (id: string) => {
  try {
    const cultivationUsers = await fetch(`${API_URL}/cultivations/${id}/users`);
    const parsedRes = await cultivationUsers.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
/**
 * add a user to the cultivation.
 * @param cultivation_id string
 * @param payload addUserPayload
 * @returns Promise
 */
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
    console.error('Failed to add cultivation users:', e);
    return { error: { message: 'Failed to add cultivation users. Please try again later.' } };
  }
};

/**
 * Remove a user from a cultivation
 * @param cultivation_id string
 * @param userId number
 * @returns Promise
 */
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
    return { error: { message: 'Failed to add cultivation users. Please try again later.' } };
  }
};

/**
 * Get a list of all users
 * @returns Promise
 */
export const getUsers = async () => {
  try {
    const users = await fetch(`${API_URL}/users`);
    const parsedRes = await users.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};

/**
 * Get a list of cultivation roles
 * @returns Promise
 */
export const getCultivationRoles = async () => {
  try {
    const roles = await fetch(`${API_URL}/cultivation-roles`);
    const parsedRes = await roles.json();
    return parsedRes;
  } catch (e) {
    console.error('error:', e);
  }
};
/**
 * @param cultivation_id string
 * @param payload {role: { id:number } }
 * @param userId number
 * Update the role of a user in the cultivation.
 * @returns Promise
 */
export const updateRole = async (cultivation_id: string, payload: { role: { id: number } }, userId: number) => {
  try {
    const requestOptions = {
      ...headers,
      method: METHODS.PUT,
      body: JSON.stringify(payload),
    };
    const roles = await fetch(`${API_URL}/cultivations/${cultivation_id}/users/${userId}`, requestOptions);
    const parsedRes = await roles.json();
    return parsedRes;
  } catch (e) {
    return { error: { message: 'Error updating the role' } };
  }
};
