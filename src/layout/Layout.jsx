import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex flex-col h-screen">
      {path === "/main" ? <Header /> : null}
      <div
        className="flex-grow overflow-y-auto  scrollbar-hide"
        style={{
          height:
            path === "/main"
              ? "calc(100vh - 160px)" // Header + Navbar 있을 때
              : "calc(100vh - 64px)", // Navbar만 있을 때
        }}
      >
        <Outlet />
      </div>
      <div className="w-full h-[64px]">
        <Navbar />
      </div>
    </div>
  );
}

export default Layout;
