import { TOrder } from '@utils-types';
import {
  orderSlice,
  createOrder,
  getOrderByNumber,
  getOrders,
  clearCurrentOrder
} from '../orderSlice';
import { error } from 'console';

const orderReducer = orderSlice.reducer;
const initialState = orderSlice.getInitialState();

const mockOrder: TOrder = {
  _id: 'o-new-123',
  status: 'pending',
  name: 'Burger name',
  number: 12345,
  ingredients: [],
  createdAt: '',
  updatedAt: ''
};

const mockOrders: TOrder[] = [
  { ...mockOrder, number: 100 },
  { ...mockOrder, number: 101 }
];

const mockError: Error = {
  name: 'OrderError',
  message: 'Order creation failed'
};

describe('orderSlice: createOrder', () => {
  test('createOrder.pending – должен установить orderRequest=true', () => {
    const stateWithError = { ...initialState, error: 'Old Error' };
    const newState = orderReducer(stateWithError, createOrder.pending('', []));

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.currentOrder).toBe(null);
  });

  test('createOrder.fulfilled — должен записать заказ и сбросить orderRequest', () => {
    const stateWithRequest = { ...initialState, orderRequest: true };
    const newState = orderReducer(
      stateWithRequest,
      createOrder.fulfilled(mockOrder, '', [])
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.currentOrder).toEqual(mockOrder);
    expect(newState.error).toBe(null);
  });

  test('createOrder.rejected — должен записать ошибку и сбросить orderRequest', () => {
    const stateWithRequest = { ...initialState, orderRequest: true };
    const newState = orderReducer(
      stateWithRequest,
      createOrder.rejected(mockError, '', [])
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe(mockError.message);
    expect(newState.currentOrder).toBe(null);
  });
});

describe('orderSlice: getOrderByNumber', () => {
  test('getOrderByNumber.pending — должен сбросить selectedOrder и error', () => {
    const stateWithError = {
      ...initialState,
      selectedOrder: mockOrder,
      error: 'Old Error'
    };
    const newState = orderReducer(
      stateWithError,
      getOrderByNumber.pending('', 123)
    );

    expect(newState.selectedOrder).toBe(null);
    expect(newState.error).toBe(null);
  });

  test('getOrderByNumber.fulfilled — должен записать заказ в selectedOrder', () => {
    const newState = orderReducer(
      initialState,
      getOrderByNumber.fulfilled(mockOrder, '', 123)
    );

    expect(newState.selectedOrder).toEqual(mockOrder);
  });

  test('getOrderByNumber.rejected — должен записать ошибку', () => {
    const newState = orderReducer(
      initialState,
      getOrderByNumber.rejected(mockError, '', 123)
    );

    expect(newState.error).toBe(mockError.message);
  });
});

describe('orderSlice: getOrders', () => {
  test('getOrders.pending —должен сбросить ошибку', () => {
    const stateWithError = { ...initialState, error: 'old error' };
    const newState = orderReducer(
      stateWithError,
      getOrders.pending('', undefined)
    );

    expect(newState.error).toBe(null);
  });

  test('getOrders.fulfilled — должен записать список заказов в orders', () => {
    const newState = orderReducer(
      initialState,
      getOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(newState.orders).toEqual(mockOrders);
  });

  test('getOrders.rejected — должен записать ошибку', () => {
    const newState = orderReducer(
      initialState,
      getOrders.rejected(mockError, '', undefined, mockError)
    );

    expect(newState.error).toBe(mockError.message);
  });
});

describe('orderSlice: clearCurrentOrder', () => {
  test('должен очистить currentOrder', () => {
    const stateWithOrder = { ...initialState, currentOrder: mockOrder };
    const newState = orderReducer(stateWithOrder, clearCurrentOrder());

    expect(newState.currentOrder).toBe(null);
  });
});
