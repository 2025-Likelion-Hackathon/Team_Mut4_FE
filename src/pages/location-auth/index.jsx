import React from "react";
import { Link } from "react-router-dom";

function LocationAuthPage() {
  return (
    <div>
      <h2>현지인 인증 페이지</h2>
      <Link to="/main"> 인증 완료 후 메인 페이지로 이동 </Link>
    </div>
  );
}

export default LocationAuthPage;
