import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import httpService from "@/services/httpService";
import BaseUrl from "@/consts/baseUrl";
import { showError } from "@/helpers/toast";
import AuthService from "@/services/AuthService";
import useGetUserInfo from "@/hooks/auth/useGetUserInfo";
import { Profile } from "@/interfaces/user";
import { PERMISSION_ENUM } from "@/consts/common";

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  loadingUser: boolean;
  isAdmin?: boolean;
  user: Profile | undefined;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  loadingUser: false,
  user: {} as any,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [token, setToken] = useState(httpService.getTokenStorage());
  const [isLogging, setIsLogging] = useState(false);
  const { data: user, loading: loadingUser } = useGetUserInfo({
    isTrigger: !!token,
  });

  //! Function
  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      try {
        setIsLogging(true);
        const response = await AuthService.login({ username, password });
        const token = response?.data?.data?.token || "";
        const userProfile = response?.data?.data?.profile || null;

        setToken(token);
        httpService.saveTokenStorage(token);
        httpService.saveUserStorage(userProfile);
        window.location.href = BaseUrl.Homepage;
      } catch (error) {
        showError(error);
      } finally {
        setIsLogging(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    httpService.clearStorage();
    window.sessionStorage.clear();
    window.location.reload();
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isLogging,
      isLogged: !!token,
      user,
      logout,
      login,
      loadingUser,
      isAdmin: user?.type === PERMISSION_ENUM.ADMIN,
    };
  }, [login, logout, user, token, isLogging, loadingUser]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
