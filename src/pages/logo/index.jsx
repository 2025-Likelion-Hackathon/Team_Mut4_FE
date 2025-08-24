import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/BLogo.svg?react";

function LogoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 1500); // 2초 후 자동 이동

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center pt-[40%]">
      <Link to="/auth" className=" w-full  h-full ">
        <Logo className="w-full h-full object-contain" />
      </Link>
    </div>
  );
}

export default LogoPage;
