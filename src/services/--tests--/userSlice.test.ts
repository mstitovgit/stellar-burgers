import { TUser } from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from '../userSlice';
import { TLoginData, TRegisterData } from '../../utils/burger-api';

const userReducer = userSlice.reducer;
const initialState = userSlice.getInitialState();

const mockLoginData: TLoginData = {
  email: 'mockmail@mail.com',
  password: 'test12345678'
};

const mockRegisterData: TRegisterData = {
  email: 'mockmail@mail.com',
  name: 'mockName',
  password: 'test12345678'
};

const mockUser: TUser = {
  email: 'mockmail@mail.com',
  name: 'mockName'
};

const mockError: Error = { name: 'TestError', message: 'Auth failed' };

describe('UserSlice: Тест loginUser', () => {
  test('loginUser.pending — должен установить loginRequest=true и сбросить error', () => {
    const stateWithError = {
      ...initialState,
      loginUserError: 'OldError'
    };

    const newState = userReducer(
      stateWithError,
      loginUser.pending('', mockLoginData)
    );

    expect(newState.loginUserRequest).toBe(true);
    expect(newState.loginUserError).toBe(null);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
  });

  test('loginUser.rejected — должен установить loginRequest=false и установить ошибку', () => {
    const stateWithRequest = {
      ...initialState,
      loginUserRequest: true
    };

    const newState = userReducer(
      stateWithRequest,
      loginUser.rejected(mockError, '', mockLoginData, mockError)
    );

    expect(newState.user).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBe(mockError.message);
  });

  test('loginUser.fulfilled — должен установить user, isAuthenticated=true, isAuthChecked=true, loginRequest=false', () => {
    const newState = userReducer(
      initialState,
      loginUser.fulfilled(mockUser, '', mockLoginData)
    );

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserRequest).toBe(false);
  });
});

describe('UserSlice: Тест registerUser', () => {
  test('registerUser.pending – должен установить loginRequest=true и сбросить ошибку', () => {
    const stateWithError = {
      ...initialState,
      loginUserError: 'OldError'
    };

    const newState = userReducer(
      stateWithError,
      registerUser.pending('', mockRegisterData)
    );

    expect(newState.loginUserRequest).toBe(true);
    expect(newState.loginUserError).toBe(null);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
  });

  test('registerUser.rejected – должен установить loginRequest=false, isAuthChecked=true и установить ошибку', () => {
    const stateWithRequest = {
      ...initialState,
      loginUserRequest: true
    };

    const newState = userReducer(
      stateWithRequest,
      registerUser.rejected(mockError, '', mockRegisterData, mockError)
    );

    expect(newState.user).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.loginUserRequest).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserError).toBe(mockError.message);
  });

  test('registerUser.fulfilled – должен установить user, isAuthenticated=true, isAuthChecked=true, loginRequest=false', () => {
    const newState = userReducer(
      initialState,
      registerUser.fulfilled(mockUser, '', mockRegisterData)
    );

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserRequest).toBe(false);
  });
});

describe('UserSlice: Тест logoutUser', () => {
  test('logoutUser.fulfilled – должен очистить user, установить isAuthenticated=false', () => {
    const stateWithAuth = {
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: mockUser
    };
    const newState = userReducer(
      stateWithAuth,
      logoutUser.fulfilled(undefined, '')
    );

    expect(newState.user).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loginUserRequest).toBe(false);
  });
});

describe('UserSlice: Тест getUser', () => {
  test('getUser.fulfilled — должен установить user, isAuthChecked=true, isAuthenticated=true', () => {
    const newState = userReducer(
      initialState,
      getUser.fulfilled(mockUser, '', undefined)
    );

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('getUser.rejected — должен сбросить user и установить isAuthChecked=true', () => {
    const stateWithUser = {
      ...initialState,
      isAuthenticated: true,
      user: mockUser
    };

    const newState = userReducer(
      stateWithUser,
      getUser.rejected(mockError, '', undefined)
    );

    expect(newState.user).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });
});

describe('UserSlice: Тест updateUser', () => {
  test('updateUser.fulfilled — должен обновить данные пользователя', () => {
    const updatedUser = { email: 'newmockmail@mail.com', name: 'NewMockName' };
    const newState = userReducer(
      initialState,
      updateUser.fulfilled(updatedUser, '', mockRegisterData)
    );

    expect(newState.user).toEqual(updatedUser);
  });
});
