import { racePromises } from '../../utils';

const setLoadingValue = jest.fn();

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('racePromises should set loading if timeout wins', async () => {
    const mockPromise = new Promise((resolve) => setTimeout(resolve, 500));
    const time = 300;

    await racePromises(setLoadingValue, [mockPromise], time);

    expect(setLoadingValue).toHaveBeenNthCalledWith(1, true);

    expect(setLoadingValue).toHaveBeenNthCalledWith(2, false);
  });

  test('racePromises should not set loading if promises resolve before timeout', async () => {
    const mockPromise = Promise.resolve('result1');
    const mockPromise2 = Promise.resolve('result2');
    const time = 1000;

    await racePromises(setLoadingValue, [mockPromise, mockPromise2], time);

    expect(setLoadingValue).not.toHaveBeenCalledWith(true);
    expect(setLoadingValue).toHaveBeenCalledWith(false);
  });

  test('racePromises should set an error when a promise rejects', async () => {
    const mockPromise = Promise.resolve('result1');
    const mockPromise2 = Promise.reject(new Error('Promise failed'));
    const time = 1000;

    await expect(racePromises(setLoadingValue, [mockPromise, mockPromise2], time)).rejects.toThrow('Promise failed');

    expect(setLoadingValue).toHaveBeenCalledWith(false);
  });
});
