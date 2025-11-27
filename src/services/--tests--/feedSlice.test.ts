import { TOrder } from '@utils-types';
import { fetchFeed, feedSlice } from '../feedSlice';
import { TFeedsResponse } from '../../utils/burger-api';

const feedReducer = feedSlice.reducer;
const initialState = feedSlice.getInitialState();

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    number: 100,
    ingredients: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Order 2',
    number: 101,
    ingredients: [],
    createdAt: '',
    updatedAt: ''
  }
];

const mockFeedPayload: TFeedsResponse = {
  success: true,
  orders: mockOrders,
  total: 5000,
  totalToday: 50
};

const mockError: Error = { name: 'TestError', message: 'Failed to fetch feed' };

describe('feedSlice: Тестирование fetchFeed', () => {
  test('fetchFeed.pending — должен установить isLoading=true и сбросить error', () => {
    const stateWithError = {
      ...initialState,
      error: 'Old error message'
    };

    const newState = feedReducer(
      stateWithError,
      fetchFeed.pending('', undefined)
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('fetchFeed.fulfilled — должен установить isLoading=false и обновить данные orders, total, totalToday', () => {
    const stateWithRequest = {
      ...initialState,
      isLoading: true,
      error: 'Old error'
    };

    const newState = feedReducer(
      stateWithRequest,
      fetchFeed.fulfilled(mockFeedPayload, '', undefined)
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toBe(mockFeedPayload.total);
    expect(newState.totalToday).toBe(mockFeedPayload.totalToday);
  });

  test('fetchFeed.rejected — должен установить isLoading=false и записать ошибку', () => {
    const stateWithRequest = {
      ...initialState,
      isLoading: true
    };

    const newState = feedReducer(
      stateWithRequest,
      fetchFeed.rejected(mockError, '')
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError.message);
    expect(newState.orders).toEqual([]);
  });
});
