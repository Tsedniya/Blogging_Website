import React from "react";
import Navbar from "./navbar.component";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Wrapper;
