import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PERMISSION_ENUM } from '@/consts/common';
import httpService from '@/services/httpService';
import { UserInfo } from '@/interfaces/user';
import { useToast } from '@/components/ui/use-toast';

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: UserInfo | null;
  login: ({ username, password }: { username: string; password: string }) => void;
  logout: () => void;
  isAdmin: boolean;
  isAppManager: boolean;
  isUser: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  isAppManager: false,
  isUser: false,
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const { toast  } = useToast();
  const [token, setToken] = useState(httpService.getTokenStorage());
  const [user, setUser] = useState<UserInfo | null>(httpService.getUserStorage());
  const [isLogging, setIsLogging] = useState(false);

  //! Function
  const login = useCallback(({ username, password }: { username: string; password: string }) => {
    setIsLogging(true);

    if (username === 'don' && password === 'don') {
      const mockToken =
        'eyJraWQiOiJ2cEFTTkxvZVwvdWh2dkwrRm5EYWdROVBkNnlPVFMranVpODFxTGFUSkdtVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5YTI5ZDVkNC1iYjM5LTRhY2YtOTJiNi0xMjk5YjUxMmU5YzQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1c2VyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV83d3pXVjZ5eUwiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0NTBtYmFmYm5yZHMwcDhlNXJrM2pmNGp0NSIsIm9yaWdpbl9qdGkiOiJhMDEzNzdiNC0wOWYyLTQyZjAtYTI3NS1iZDcyMGI4ZDdiYzYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjc5NTcwMTg3LCJleHAiOjE2Nzk1NzM3ODcsImlhdCI6MTY3OTU3MDE4NywianRpIjoiMDk0NjViZjYtYjQ3NS00NTRmLWEyNzItZjMyYTljYmE1NDFmIiwidXNlcm5hbWUiOiJhcHB1c2VyMDEifQ.gIkfpfdkR0awyo3d4bYpL4NB5Hq78YOS_xkQ3QrwHMyLzdzLJAmmRU9Ugm0M4zlN4h12S4Kju59Ixw1eH1dsyCXvdYGS8iAijoZJZYNPswUI7jiKck-3e3LHN9hmsj6VqB-Yc84-5eRq6sZPtbtfKn-Em9FgOUrZ6TgJ41irBxrEQcZQR2x0-paHrl8dEFIc2KuJp77KeEAnf02vEVw9jLzF_KpMf4RO6cCfwg3fWtusyFYGFQlx34HzkMc7bpjrJe-jvWRSBCNfzyumyeUtZzNiS1v8olYjCA2k2gGaYDDXWZxpj6TcghThGmxMaMBe2R5Azb9MKewFzTqK7qYfcg';
      const mockUser = {
        id: '9a29d5d4-bb39-4acf-92b6-1299b512e9c4',
        username: 'appuser01',
        firstname: 'User 01',
        lastname: 'App',
        phoneNumber: '+849853092875',
        email: 'appuser01@testmail.com',
        company: 'Company User 01',
        address: 'Address User 01',
        roles: ['user'],
        isFirstTimeLogin: false,
      };
      setToken(mockToken);
      setUser(mockUser);

      httpService.attachTokenToHeader(mockToken);
      httpService.saveTokenStorage(mockToken);
      httpService.saveUserStorage(mockUser);
      setIsLogging(false);
    } else {
      toast({
        description: 'Username / Password is not correct!',
        variant: 'destructive'
      });
    }
  }, [toast]);

  const logout = useCallback(() => {
    httpService.clearStorage();
    window.sessionStorage.clear();
    window.location.reload();
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isLogging,
      isLogged: !!user && !!token,
      user,
      logout,
      login,
      isAdmin: !!user?.roles?.includes(PERMISSION_ENUM.ADMIN),
      isAppManager: !!user?.roles?.includes(PERMISSION_ENUM.APP_MANAGER),
      isUser: !!user?.roles?.includes(PERMISSION_ENUM.USER),
    };
  }, [login, logout, user, token, isLogging]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;