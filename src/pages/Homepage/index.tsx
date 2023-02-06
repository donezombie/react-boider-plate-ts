import baseUrl from 'constants/baseUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import React from 'react';
import { Link } from 'react-router-dom';

interface HomepageProps {}

const Homepage = (props: HomepageProps) => {
  //! State
  const { isLogged, logout } = useAuthentication();

  //! Function

  //! Render
  return (
    <div>
      <ul>
        <li>
          <Link to={baseUrl.Homepage}>Homepage</Link>
        </li>
        <li>
          <Link to={baseUrl.Login}>Login</Link>
        </li>
        <li>
          <Link to={baseUrl.Todos}>Todos</Link>
        </li>
      </ul>

      {isLogged && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default React.memo(Homepage);
