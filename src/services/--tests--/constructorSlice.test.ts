import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown
} from '../constructorSlice';

const constructorReducer = constructorSlice.reducer;

const mockBun1 = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
} as TIngredient;
const mockBun2 = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0
} as TIngredient;

const mockMain1 = {
  id: '1',
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0
} as TConstructorIngredient;
const mockMain2 = {
  id: '2',
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
} as TConstructorIngredient;
const mockMain3 = {
  id: '3',
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0
} as TConstructorIngredient;

const mockMainAdded = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0
} as TIngredient;

describe('СonstructorSlice: Добавление и удаление ингредиентов', () => {
  test('должен заменить существующую булку (bun) новым ингредиентом типа "bun"', () => {
    const initialState = {
      bun: mockBun1,
      ingredients: [mockMain1]
    };

    const newState = constructorReducer(initialState, addIngredient(mockBun2));

    expect(newState.bun).toEqual(
      expect.objectContaining({
        _id: mockBun2._id,
        name: mockBun2.name,
        type: 'bun'
      })
    );
    expect(newState.bun).toHaveProperty('id');
    expect(newState.ingredients).toEqual([mockMain1]);
  });

  test('должен добавить начинку"', () => {
    const initialState = {
      bun: mockBun2,
      ingredients: []
    };

    const newState = constructorReducer(
      initialState,
      addIngredient(mockMainAdded)
    );

    expect(newState.bun).toEqual(mockBun2);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toEqual(mockMainAdded._id);
    expect(newState.ingredients[0]).toHaveProperty('id');
  });

  test('должен удалить начинку"', () => {
    const initialState = {
      bun: mockBun2,
      ingredients: [mockMain1]
    };

    const newState = constructorReducer(initialState, removeIngredient(0));

    expect(newState.bun).toEqual(mockBun2);
    expect(newState.ingredients).toEqual([]);
  });
});

describe('constructorSlice: Изменение порядка ингредиентов', () => {
  test('перемещение ингредиента наверх', () => {
    const initialState = {
      bun: null,
      ingredients: [mockMain1, mockMain2, mockMain3]
    };

    const newState = constructorReducer(initialState, moveUp(1));

    expect(newState.bun).toEqual(null);
    expect(newState.ingredients).toEqual([mockMain2, mockMain1, mockMain3]);
  });

  test('перемещение ингредиента вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [mockMain1, mockMain2, mockMain3]
    };

    const newState = constructorReducer(initialState, moveDown(1));

    expect(newState.bun).toEqual(null);
    expect(newState.ingredients).toEqual([mockMain1, mockMain3, mockMain2]);
  });
});
