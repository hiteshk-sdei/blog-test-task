import React, { useState } from "react";
import { Typography, AppBar, Toolbar, Container } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ padding: 0 }}>
      <Container className="container">
        <Toolbar
          disableGutters
          className="header-logo"
          onClick={() => navigate("/")}
        >
          <AdbIcon sx={{ mr: 1 }} />
          <Typography variant="h5" noWrap href="" className="logo-text">
            Blog App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
