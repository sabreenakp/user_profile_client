import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { AddUser } from "./components/AddUser";
import { ConfirmSignUp } from "./components/ConfirmSignUp";
import { SignIn } from "./components/Signin";
import { UserProfile } from "./components/UserProfile";
import PageNotFound from "./components/PageNotFound";
import { GuardedRoute } from "./components/AuthGuard";

function App() {
  const isAutheticated = localStorage.getItem("auth") || false;
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          isAutheticated ? (
            <Navigate replace to="/profile/:id" />
          ) : (
            <Navigate replace to="/signin" />
          )
        }
      />
      <Route exact path="/signup" element={<AddUser />} />
      <Route
        exact
        path="/profile/:id"
        element={
          <GuardedRoute>
            <UserProfile />
          </GuardedRoute>
        }
      />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/verify/:email" element={<ConfirmSignUp />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
}

export default App;
