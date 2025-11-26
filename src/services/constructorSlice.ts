import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { randomUUID } from 'crypto';
import { RootState } from './store';

type TConstructorRState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorRState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        } as TConstructorIngredient
      })
    },
    removeIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index - 1];
      state.ingredients[index - 1] = state.ingredients[index];
      state.ingredients[index] = temp;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index + 1];
      state.ingredients[index + 1] = state.ingredients[index];
      state.ingredients[index] = temp;
    },
    clearConstructor: (state) => {
      (state.bun = null), (state.ingredients = []);
    }
  }
});

export const {
  clearConstructor,
  moveUp,
  moveDown,
  addIngredient,
  removeIngredient
} = constructorSlice.actions;

export const selectConstructor = (state: RootState) => state.burgerconstructor;
