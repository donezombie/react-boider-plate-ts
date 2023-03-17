import { useMemo, useEffect } from 'react';
import { useAuth as useAuthOIDC } from 'oidc-react';
import { useAppAuthentication } from 'providers/AppAuthenticationProvider';
import { signOut } from 'firebase/auth';
import { isEmpty } from 'lodash';
import { authFirebase } from 'helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

//* Hooks to get ALL auth
const useAuth = () => {
  //! State
  //* Okta Provider
  const authOkta = useAuthOIDC();
  const isOktaProvider = !!authOkta?.userData?.id_token;
  const isOktaLogged = !!localStorage.getItem('AUTH_OKTA');

  useEffect(() => {
    if (authOkta?.userData) {
      localStorage.setItem('AUTH_OKTA', JSON.stringify(authOkta?.userData));
    }
  }, [isOktaLogged, authOkta?.userData]);

  //* Google Provider
  const [userProviders, loadingProviders] = useAuthState(authFirebase);

  //* Local Provider
  const authApp = useAppAuthentication();

  const user = useMemo(() => {
    if (!isEmpty(authOkta?.userData)) {
      return authOkta?.userData;
    }

    if (!isEmpty(authApp?.user)) {
      return authApp.user;
    }

    return userProviders;
  }, [authOkta?.userData, authApp?.user, userProviders]);

  //! Return
  return useMemo(() => {
    return {
      loading: loadingProviders,
      isLogged: true || !isEmpty(user),
      user,
      logout: isOktaProvider ? authOkta.signOut : () => signOut(authFirebase),
    };
  }, [isOktaProvider, loadingProviders, user]);
};

export default useAuth;
