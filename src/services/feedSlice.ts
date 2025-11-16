import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from './store';

type TFeed = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null;
};

const initialState: TFeed = {
  orders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null
};

export const fetchFeed = createAsyncThunk('feed', async () => getFeedsApi());

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const selectFeed = (state: RootState) => state.feed;
