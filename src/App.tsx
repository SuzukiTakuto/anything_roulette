import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { UserContext } from './type';
import { User } from 'firebase/auth';
import { Select } from './pages/Select';
import { Register } from './pages/Register';
import { Roulette } from './pages/Roulette';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const userContext = React.createContext<UserContext>({ user, setUser });

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/select" element={<Select />} />
            <Route path="/register" element={<Register />} />
            <Route path="/roulette" element={<Roulette />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
