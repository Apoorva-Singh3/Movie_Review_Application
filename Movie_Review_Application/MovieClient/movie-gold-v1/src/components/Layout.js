import { radioClasses } from "@mui/material";
import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
  return (
    <main>
      <Outlet/>
    </main>
  )
}

export default Layout
