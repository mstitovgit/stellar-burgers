import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { userSlice } from './userSlice';
import { constructorSlice } from './constructorSlice';
import { feedSlice } from './feedSlice';
import { orderSlice } from './orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerconstructor: constructorSlice.reducer,
  feed: feedSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
