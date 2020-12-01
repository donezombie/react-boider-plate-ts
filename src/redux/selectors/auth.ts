import { useSelector } from 'react-redux';

export const GetAuthSelector = () => {
  const auth = useSelector((state: any) => state.authReducer.auth);
  if (auth) {
    return auth;
  }
};
