import React from 'react';
import { Routes,Route } from 'react-router-dom';

import './App.css';
import {AddUser} from './components/AddUser';
import {UserProfile} from './components/UserProfile';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<AddUser />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
