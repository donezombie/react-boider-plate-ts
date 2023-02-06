import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import HttpService from 'services/httpService';
import { showError } from 'helpers/toast';

type Action =
  | { type: 'LOGIN_SUCCESS'; token: string }
  | { type: 'LOGGING_OUT_SUCCESS' }
  | { type: 'LOGGING_OUT_FAILED' };
type State = {
  token: string;
  isLogged: boolean;
  isLoggingOut: boolean;
  user?: {};
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.token,
        isLogged: true,
        isLoggingOut: false,
      };

    case 'LOGGING_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: true,
      };

    case 'LOGGING_OUT_FAILED':
      return {
        ...state,
        isLoggingOut: false,
      };

    default:
      return state;
  }
};

interface AuthenticationContextI extends State {
  login: ({ username, password }: { username: string; password: string }) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  token: '',
  isLogged: false,
  isLoggingOut: false,
  login: () => {},
  logout: () => {},
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthProvider = ({ children }: { children: any }) => {
  //! State
  const tokenLocalStorage = HttpService.getTokenStorage();
  const [authReducer, dispatch] = useReducer(reducer, {
    token: tokenLocalStorage,
    isLogged: !!tokenLocalStorage,
    isLoggingOut: false,
    user: {},
  });

  //! Function
  const onLoginSuccess = useCallback((token: string) => {
    HttpService.attachTokenToHeader(token);
    HttpService.saveTokenStorage(token);
    dispatch({ type: 'LOGIN_SUCCESS', token });
  }, []);

  useEffect(() => {
    if (tokenLocalStorage) {
      //* Check if localstorage has token -> login with Token
      onLoginSuccess(tokenLocalStorage);
    }
  }, [tokenLocalStorage, onLoginSuccess]);

  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      return new Promise(async (resolve, reject) => {
        try {
          if (username === 'don' && password === 'don') {
            const token = 'fake token';
            onLoginSuccess(token);
          }

          resolve('');
        } catch (error) {
          reject(error);
          showError(error);
        }
      });
    },
    [dispatch, onLoginSuccess]
  );

  const logout = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: 'LOGGING_OUT_SUCCESS' });
        window.localStorage.clear();
        window.location.reload();
        resolve('');
      } catch (error) {
        dispatch({ type: 'LOGGING_OUT_FAILED' });
        showError(error);
        reject(error);
      }
    });
  }, [dispatch]);

  //! Render
  const value = useMemo(() => {
    return {
      ...authReducer,
      login,
      logout,
    };
  }, [authReducer, login, logout]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthProvider;
