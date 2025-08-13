import React from "react";
import { Link } from "react-router-dom";

function LogoPage() {
  return (
    <div>
      <h2>Logo Page</h2>
      <Link to="/auth"> 현지인인증 인증하기 </Link>
    </div>
  );
}

export default LogoPage;
