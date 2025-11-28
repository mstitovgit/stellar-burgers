import { rootReducer } from '../store';

describe('Проверка rootReducer', () => {
  it('должен возвращать начальное состояние rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerconstructor');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('order');

    expect(initialState.ingredients).toEqual({
      data: [],
      loading: false,
      error: null
    });

    expect(initialState.user).toEqual({
      isAuthChecked: false,
      isAuthenticated: false,
      user: null,
      loginUserError: null,
      loginUserRequest: false
    });

    expect(initialState.order).toEqual({
      currentOrder: null,
      selectedOrder: null,
      orders: [],
      orderRequest: false,
      error: null
    });

    expect(initialState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    });

    expect(initialState.burgerconstructor).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
