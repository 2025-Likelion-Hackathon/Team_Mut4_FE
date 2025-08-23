import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg?react";

function LogoPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Link to="/auth">
        <Logo />
      </Link>
    </div>
  );
}

export default LogoPage;
