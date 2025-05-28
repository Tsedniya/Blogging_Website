import React from "react";
import Navbar from "./navbar.component";
import { Outlet, useLocation } from "react-router-dom";

const Wrapper = () => {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === "/editor"; // Use location after declaration

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Wrapper;
