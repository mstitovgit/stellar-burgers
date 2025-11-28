import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../utils/burger-api';
import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from './store';

type TOrderState = {
  currentOrder: TOrder | null;
  selectedOrder: TOrder | null;
  orders: TOrder[];
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  currentOrder: null,
  selectedOrder: null,
  orders: [],
  orderRequest: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.selectedOrder = null;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || null;
      });
  }
});

export const { clearCurrentOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;
