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
import { PERMISSION_ENUM } from 'consts/index';

type Action =
  | { type: 'LOGIN_SUCCESS'; token: string; user: any }
  | { type: 'LOGGING_OUT_SUCCESS' }
  | { type: 'LOGGING_OUT_FAILED' };

type State = {
  token: string;
  isLogged: boolean;
  isLoggingOut: boolean;
  user?: {
    role?: PERMISSION_ENUM;
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.token,
        isLogged: true,
        isLoggingOut: false,
        user: {
          ...action?.user,
        },
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
  onLoginSuccess: (token: string, user: any) => void;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  token: '',
  isLogged: false,
  isLoggingOut: false,
  login: () => {},
  logout: () => {},
  onLoginSuccess: () => {},
});

export const useAppAuthentication = () => useContext(AuthenticationContext);

const AppAuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const tokenLocalStorage = HttpService.getTokenStorage();
  const [authReducer, dispatch] = useReducer(reducer, {
    token: tokenLocalStorage,
    isLogged: !!tokenLocalStorage,
    isLoggingOut: false,
    user: {},
  });

  //! Function
  const onLoginSuccess = useCallback((token: string, user?: any) => {
    HttpService.attachTokenToHeader(token);
    HttpService.saveTokenStorage(token);
    dispatch({ type: 'LOGIN_SUCCESS', token, user });
  }, []);

  useEffect(() => {
    if (tokenLocalStorage) {
      //* Check if localstorage has token -> login with Token
      onLoginSuccess(tokenLocalStorage);
    }
  }, [tokenLocalStorage, onLoginSuccess]);

  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      (async () => {
        try {
          if (username === 'don' && password === 'don') {
            const token = 'fake token';
            onLoginSuccess(token);
          }
        } catch (error) {
          showError(error);
        }
      })();
    },
    [dispatch, onLoginSuccess]
  );

  const logout = useCallback(() => {
    (async () => {
      try {
        dispatch({ type: 'LOGGING_OUT_SUCCESS' });
        window.localStorage.clear();
        window.location.reload();
      } catch (error) {
        dispatch({ type: 'LOGGING_OUT_FAILED' });
        showError(error);
      }
    })();
  }, [dispatch]);

  //! Render
  const value = useMemo(() => {
    return {
      ...authReducer,
      login,
      logout,
      onLoginSuccess,
    };
  }, [authReducer, login, logout, onLoginSuccess]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AppAuthenticationProvider;
