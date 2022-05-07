import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { AddUser } from "./components/AddUser";
import {ConfirmSignUp} from "./components/ConfirmSignUp";
import { SignIn } from "./components/Signin";
import { UserProfile } from "./components/UserProfile";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<AddUser />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/verify/:email" element={<ConfirmSignUp />} />
    </Routes>
  );
}

export default App;
