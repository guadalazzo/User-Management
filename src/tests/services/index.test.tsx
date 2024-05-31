import {
  getCultivations,
  getCultivationUsers,
  addCultivationUsers,
  deleteUserFromCultivation,
  getUsers,
  getCultivationRoles,
  updateRole,
} from '../../services';
import { API_URL, METHODS, headers } from '../../utils/consts';
import { addUserPayload } from '../../types';

describe('Service API Functions', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mock function state before each test
  });

  const mockFetch = jest.fn();

  beforeEach(() => {
    (global as any).fetch = mockFetch;
  });

  const mockFetchResponse = (response: any, status: number = 200) => {
    return Promise.resolve({
      status,
      json: () => Promise.resolve(response),
    });
  };

  it('getCultivations should fetch cultivations successfully', async () => {
    const mockResponse = [{ id: '1', name: 'Cultivation Name' }];
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const cultivations = await getCultivations();
    expect(cultivations).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivations`);
  });

  it('getCultivationUsers should fetch cultivation users successfully', async () => {
    const mockResponse = [{ id: '1', name: 'Cultivation name' }];
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const cultivationUsers = await getCultivationUsers('1');
    expect(cultivationUsers).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivations/1/users`);
  });

  it('addCultivationUsers should add users to cultivation successfully', async () => {
    const payload: addUserPayload = {
      role: {
        id: 1,
      },
      user: {
        id: 1,
      },
    };
    const mockResponse = { message: 'User added successfully' };
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const response = await addCultivationUsers('1', payload);
    expect(response).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivations/1/users`, {
      ...headers,
      method: METHODS.POST,
      body: JSON.stringify(payload),
    });
  });

  it('deleteUserFromCultivation should delete user from cultivation successfully', async () => {
    mockFetch.mockResolvedValueOnce(Promise.resolve({ status: 204 }));
    const response = await deleteUserFromCultivation('1', 1);
    expect(response).toEqual({ message: 'User successfully deleted from cultivation' });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivations/1/users/1`, {
      method: METHODS.DELETE,
    });
  });

  it('getUsers should fetch users successfully', async () => {
    const mockResponse = [{ id: '1', name: 'Cultivation name' }];
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const users = await getUsers();
    expect(users).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/users`);
  });

  it('getCultivationRoles should fetch cultivation roles successfully', async () => {
    const mockResponse = [{ id: '1', name: 'Role 1' }];
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const roles = await getCultivationRoles();
    expect(roles).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivation-roles`);
  });

  it('updateRole should update user role in cultivation successfully', async () => {
    const payload = { role: { id: 1 } };
    const mockResponse = { message: 'Role updated successfully' };
    mockFetch.mockResolvedValueOnce(mockFetchResponse(mockResponse));
    const response = await updateRole('1', payload, 1);
    expect(response).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/cultivations/1/users/1`, {
      ...headers,
      method: METHODS.PUT,
      body: JSON.stringify(payload),
    });
  });
});
