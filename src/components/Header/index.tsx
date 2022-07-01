import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = (props) => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Header;
