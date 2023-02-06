import baseUrl from "constants/baseUrl";
import React from "react";
import { Link } from "react-router-dom";

interface HomepageProps {}

const Homepage = (props: HomepageProps) => {
  //! State

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
    </div>
  );
};

export default React.memo(Homepage);
