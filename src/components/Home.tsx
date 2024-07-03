import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
// import FileManager from "./FileManager";

import { Container } from "@mui/material";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("login");
  };

  return <Container maxWidth="sm">{/* <FileManager /> */}</Container>;
};

export default Home;
