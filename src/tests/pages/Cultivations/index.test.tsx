/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import Cultivations from '../../../pages/Cultivations/index.tsx';
import { getCultivations } from '../../../services/index.ts';
import { cultivation } from '../../../types';

const mockStore = configureStore([]);
const mockFetch = jest.fn();

jest.mock('../../../services', () => ({
  getCultivations: jest.fn(),
}));

describe('Cultivations', () => {
  let store;
  const mockCultivations: cultivation[] = [
    { id: '1', name: 'Cultivation 1' },
    { id: '2', name: 'Cultivation 2' },
  ];

  beforeEach(() => {
    store = mockStore({
      // Add your initial Redux state here if necessary
    });
    (global as unknown).fetch = mockFetch;

    jest.clearAllMocks();
  });

  it('renders Cultivations component and fetches cultivations successfully', async () => {
    getCultivations.mockResolvedValueOnce(mockCultivations);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Cultivations />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getCultivations).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Cultivations')).toBeInTheDocument();
    expect(screen.getByText('Cultivation 1')).toBeInTheDocument();
    expect(screen.getByText('Cultivation 2')).toBeInTheDocument();
  });

  it('renders no results message when no cultivations are available', async () => {
    getCultivations.mockResolvedValueOnce([]);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Cultivations />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getCultivations).toHaveBeenCalledTimes(1));

    expect(screen.getByText('No available results')).toBeInTheDocument();
  });

  it('displays an error message if fetching cultivations fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    getCultivations.mockRejectedValueOnce(new Error('Failed to load Cultivations'));

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Cultivations />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getCultivations).toHaveBeenCalledTimes(1));

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load Cultivations:', expect.any(Error));

    consoleSpy.mockRestore();
  });

  it('renders a link to edit a cultivation', async () => {
    getCultivations.mockResolvedValueOnce(mockCultivations);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Cultivations />
          </BrowserRouter>
        </Provider>,
      );
    });

    await waitFor(() => expect(getCultivations).toHaveBeenCalledTimes(1));

    const editLinks = screen.getAllByText('Edit');
    expect(editLinks.length).toBe(2);
    expect(editLinks[0]).toHaveAttribute('href', '/edit/1');
    expect(editLinks[1]).toHaveAttribute('href', '/edit/2');
  });
});
