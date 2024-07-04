import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import PrivateRoute from "./guard/AuthGuard";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
